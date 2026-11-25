import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync, execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteDir = path.join(root, 'site');
const configPath = path.join(root, 'kbs.json');
const stageDir = path.join(root, '.build-src');
const outDir = path.join(root, '.build-out');
const distDir = path.join(root, 'dist');
const toolsDir = path.join(root, '.tools', 'soupault');
const SOUPAULT_VERSION = '5.3.0';
const SOUPAULT_REPO = 'PataphysicalSociety/soupault';

function log(...args) {
  console.log(...args);
}

function isDirectory(value) {
  try {
    return fs.statSync(value).isDirectory();
  } catch {
    return false;
  }
}

async function copyTree(from, to) {
  await fsp.mkdir(to, { recursive: true });
  const entries = await fsp.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    if (entry.isDirectory()) {
      const name = entry.name.toLowerCase();
      if (['src', 'drafts'].includes(name) || entry.name.startsWith('_') || name.includes('backup')) continue;
    }
    if (entry.isFile() && /^(\.DS_Store|Thumbs\.db)$/i.test(entry.name)) continue;
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyTree(source, target);
    } else if (entry.isFile()) {
      await fsp.copyFile(source, target);
    }
  }
}

function lastGitDate(relativePath) {
  try {
    const value = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', relativePath],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], windowsHide: true },
    ).trim();
    return value || null;
  } catch {
    return null;
  }
}

async function newestMtime(dir, files) {
  let newest = 0;
  for (const file of files) {
    try {
      const stat = await fsp.stat(path.join(dir, file));
      newest = Math.max(newest, stat.mtimeMs);
    } catch {
      // File disappeared between listing and stat.
    }
  }
  return newest ? new Date(newest).toISOString().slice(0, 10) : null;
}

function findBinary(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && (entry.name === 'soupault' || entry.name === 'soupault.exe')) return full;
    if (entry.isDirectory()) {
      const nested = findBinary(full);
      if (nested) return nested;
    }
  }
  return null;
}

function soupaultAsset() {
  const platform = process.platform;
  const arch = process.arch;
  if (platform === 'win32') return `soupault-${SOUPAULT_VERSION}-win64.zip`;
  if (platform === 'linux' && arch === 'x64') return `soupault-${SOUPAULT_VERSION}-linux-x86_64.tar.gz`;
  if (platform === 'linux' && arch === 'arm64') return `soupault-${SOUPAULT_VERSION}-linux-arm64.tar.gz`;
  if (platform === 'darwin' && arch === 'x64') return `soupault-${SOUPAULT_VERSION}-macos-x86_64.tar.gz`;
  if (platform === 'darwin' && arch === 'arm64') return `soupault-${SOUPAULT_VERSION}-macos-arm64.tar.gz`;
  return null;
}

async function download(url, target) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`下载失败：${url}（HTTP ${response.status}）`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fsp.mkdir(path.dirname(target), { recursive: true });
  await fsp.writeFile(target, buffer);
  return buffer;
}

function extractArchive(archivePath, targetDir) {
  if (process.platform === 'win32') {
    // The build shell may expose GNU tar (which cannot read zip) before the
    // Windows System32 bsdtar, so use the system binary explicitly. Fall back
    // to PowerShell on the off chance it is missing.
    const systemTar = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
    if (fs.existsSync(systemTar)) {
      execFileSync(systemTar, ['-xf', archivePath, '-C', targetDir], { stdio: 'inherit' });
      return;
    }
    execFileSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        'Expand-Archive -LiteralPath $env:SOUPAULT_ARCHIVE -DestinationPath $env:SOUPAULT_DIR -Force',
      ],
      {
        env: { ...process.env, SOUPAULT_ARCHIVE: archivePath, SOUPAULT_DIR: targetDir },
        stdio: 'inherit',
      },
    );
    return;
  }
  execFileSync('tar', ['-xf', archivePath, '-C', targetDir], { stdio: 'inherit' });
}

async function ensureSoupault() {
  if (process.env.SOUPAULT_BIN && fs.existsSync(process.env.SOUPAULT_BIN)) {
    return process.env.SOUPAULT_BIN;
  }
  const cacheDir = path.join(toolsDir, SOUPAULT_VERSION);
  await fsp.mkdir(cacheDir, { recursive: true });
  const cached = findBinary(cacheDir);
  if (cached) return cached;

  const asset = soupaultAsset();
  if (!asset) {
    throw new Error(`没有适用于 ${process.platform}-${process.arch} 的 Soupault 二进制。请设置 SOUPAULT_BIN。`);
  }
  const base = `https://github.com/${SOUPAULT_REPO}/releases/download/${SOUPAULT_VERSION}`;
  const sumsPath = path.join(cacheDir, 'sha256sums');
  const archivePath = path.join(cacheDir, asset);
  let sums = '';
  try {
    sums = await fsp.readFile(sumsPath, 'utf8');
  } catch {
    sums = (await download(`${base}/sha256sums`, sumsPath)).toString('utf8');
  }
  const line = sums.split(/\r?\n/).find((item) => item.includes(asset));
  if (!line) throw new Error(`Soupault 校验文件中没有 ${asset}`);
  const expected = line.trim().split(/\s+/)[0];

  let archive;
  try {
    archive = await fsp.readFile(archivePath);
  } catch {
    archive = await download(`${base}/${asset}`, archivePath);
  }
  const actual = crypto.createHash('sha256').update(archive).digest('hex');
  if (actual !== expected) {
    await fsp.rm(archivePath, { force: true });
    throw new Error(`Soupault 下载校验失败：${asset}`);
  }

  log(`解压 Soupault ${SOUPAULT_VERSION}…`);
  extractArchive(archivePath, cacheDir);
  const binary = findBinary(cacheDir);
  if (!binary) throw new Error('Soupault 解压后找不到可执行文件。');
  if (process.platform !== 'win32') fs.chmodSync(binary, 0o755);
  return binary;
}

function runSoupault(binary) {
  log('');
  log('运行 Soupault…');
  execFileSync(binary, [], { cwd: root, stdio: 'inherit', env: process.env });
}

function runPagefind() {
  log('');
  log('运行 Pagefind…');
  execSync('npx pagefind --site .build-out', {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });
}

async function buildLibrary(config) {
  const kbs = [];
  let latestUpdated = '';
  for (const raw of config.kbs) {
    const sourceDir = path.resolve(root, raw.source);
    const exists = isDirectory(sourceDir);
    let updatedAt = null;
    let pageCount = 0;
    if (exists) {
      const files = (await fsp.readdir(sourceDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && /\.html?$/i.test(entry.name))
        .map((entry) => entry.name);
      pageCount = files.length;
      const relative = path.relative(root, sourceDir).split(path.sep).join('/');
      updatedAt = lastGitDate(relative) || await newestMtime(sourceDir, files);
      if (updatedAt && updatedAt > latestUpdated) latestUpdated = updatedAt;
    }
    const status = raw.status || (exists ? (pageCount ? 'active' : 'empty') : 'planned');
    kbs.push({ ...raw, status, updatedAt });
  }
  kbs.sort((a, b) => {
    const orderA = Number(a.order ?? 999);
    const orderB = Number(b.order ?? 999);
    return orderA - orderB || String(a.slug).localeCompare(String(b.slug));
  });
  return {
    site: { ...(config.site || {}), latestUpdated: latestUpdated || null },
    kbs,
  };
}

async function stageSite(config) {
  await fsp.rm(stageDir, { recursive: true, force: true });
  await fsp.mkdir(stageDir, { recursive: true });
  await copyTree(siteDir, stageDir);
  for (const kb of config.kbs) {
    const sourceDir = path.resolve(root, kb.source);
    if (!isDirectory(sourceDir)) continue;
    await copyTree(sourceDir, path.join(stageDir, 'kb', kb.slug));
  }
  await fsp.mkdir(path.join(stageDir, 'data'), { recursive: true });
  const library = await buildLibrary(config);
  await fsp.writeFile(
    path.join(stageDir, 'data', 'library.json'),
    JSON.stringify(library, null, 2),
    'utf8',
  );
  return library;
}

function validateConfig(config) {
  if (!config || !Array.isArray(config.kbs)) throw new Error('kbs.json 缺少 kbs 数组。');
  const seen = new Set();
  for (const kb of config.kbs) {
    if (!kb.slug || !/^[a-z0-9][a-z0-9-]*$/.test(kb.slug)) {
      throw new Error(`知识库 slug 无效：${kb.slug}`);
    }
    if (seen.has(kb.slug)) throw new Error(`知识库 slug 重复：${kb.slug}`);
    seen.add(kb.slug);
    if (!kb.source) throw new Error(`知识库 ${kb.slug} 缺少 source。`);
    const sourceDir = path.resolve(root, kb.source);
    if (sourceDir !== root && !sourceDir.startsWith(root + path.sep)) {
      throw new Error(`知识库 ${kb.slug} 的 source 必须在仓库目录内。`);
    }
    if (kb.status !== 'planned' && !isDirectory(sourceDir)) {
      throw new Error(`知识库 ${kb.slug} 的目录不存在：${kb.source}`);
    }
  }
}

export async function build() {
  const started = Date.now();
  const config = JSON.parse(await fsp.readFile(configPath, 'utf8'));
  validateConfig(config);

  const soupault = await ensureSoupault();
  const library = await stageSite(config);

  await fsp.rm(outDir, { recursive: true, force: true });
  await fsp.mkdir(outDir, { recursive: true });
  runSoupault(soupault);
  runPagefind();

  if (!fs.existsSync(path.join(outDir, 'index.html'))) throw new Error('Soupault 没有生成 index.html。');
  if (!fs.existsSync(path.join(outDir, 'index.json'))) throw new Error('Soupault 没有生成 index.json。');
  if (!fs.existsSync(path.join(outDir, 'pagefind', 'pagefind.js'))) throw new Error('Pagefind 没有生成 pagefind/pagefind.js。');

  const index = JSON.parse(await fsp.readFile(path.join(outDir, 'index.json'), 'utf8'));
  const pages = index.filter((entry) => entry.kb);

  await fsp.rm(distDir, { recursive: true, force: true });
  await fsp.rename(outDir, distDir);

  log('');
  log(`构建完成：${library.kbs.filter((kb) => kb.status !== 'planned').length} 个知识库，${pages.length} 个页面。`);
  log(`输出目录：${distDir}（${Date.now() - started} ms）`);
  return { library, index };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((error) => {
    console.error('');
    console.error(`构建失败：${error.message}`);
    console.error(error.stack);
    process.exitCode = 1;
  });
}
