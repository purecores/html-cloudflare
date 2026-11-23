import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteDir = path.join(root, 'site');
const distDir = path.join(root, 'dist');
const tmpDir = path.join(root, '.dist-tmp');
const configPath = path.join(root, 'kbs.json');

const SEARCH_LIMIT = 5000;
const BLOCKS = 'h2,h3,h4,h5,p,li,td,th,blockquote,dt,dd,figcaption,caption,pre';
const NOISE = [
  'script', 'style', 'template', 'nav', 'button', 'textarea',
  '.am-toolbar', '.am-export', '.am-toc', '.am-code-copy', '.am-table-controls',
  '.am-diagram-expand', '.am-comment-btn', '.am-remark-hover', '.am-remark-pop',
  '.am-reply', '.am-reply-bar', 'math', '.am-math-block',
].join(',');

const EMBED_CSS = `
/* Injected by the host build: the shelf owns search, theme and type size. */
.am-toolbar, .am-export, .am-colophon, .am-reply, .am-reply-bar, .am-remark-hover, .am-remark-pop, .am-comment-btn { display: none !important; }
.am-doc { padding-top: 34px !important; }
.am-toc { top: 16px !important; }
@media (max-width: 760px) {
  .am-sheet, .am-doc { padding-top: 22px !important; }
}
`;

function log(...args) {
  console.log(...args);
}

function normalize(value) {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/[\u200b-\u200d\ufeff]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function charCount(text) {
  return text.replace(/\s/g, '').length;
}

function escapeForLog(value) {
  return String(value).replace(/\n/g, ' ');
}

function isDirectory(value) {
  try {
    return fs.statSync(value).isDirectory();
  } catch {
    return false;
  }
}

function pageSort(a, b) {
  const ai = a.toLowerCase() === 'index.html';
  const bi = b.toLowerCase() === 'index.html';
  if (ai !== bi) return ai ? -1 : 1;
  const am = a.match(/^(\d+)/);
  const bm = b.match(/^(\d+)/);
  if (am && bm) {
    const diff = Number(am[1]) - Number(bm[1]);
    if (diff) return diff;
  } else if (am) {
    return -1;
  } else if (bm) {
    return 1;
  }
  return a.localeCompare(b, 'zh-CN');
}

async function copyTree(from, to, { skipMarkdown = true } = {}) {
  await fsp.mkdir(to, { recursive: true });
  const entries = await fsp.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    if (entry.isDirectory() && entry.name.toLowerCase() === 'src') continue;
    if (skipMarkdown && entry.isFile() && /\.(md|markdown)$/i.test(entry.name)) continue;
    if (entry.isFile() && /^(\.DS_Store|Thumbs\.db)$/i.test(entry.name)) continue;
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyTree(source, target, { skipMarkdown });
    } else if (entry.isFile()) {
      await fsp.copyFile(source, target);
    }
  }
}

async function injectHostStyle(file) {
  let html = await fsp.readFile(file, 'utf8');
  if (html.includes('data-kb-host-style')) return;
  const tag = `<style data-kb-host-style>${EMBED_CSS}</style>`;
  const head = html.search(/<\/head\s*>/i);
  html = head >= 0 ? html.slice(0, head) + tag + html.slice(head) : tag + html;
  await fsp.writeFile(file, html, 'utf8');
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
      // Ignore a file that disappears mid-build.
    }
  }
  return newest ? new Date(newest).toISOString().slice(0, 10) : null;
}

function extractPage(html, file, slug) {
  const $ = cheerio.load(html);
  const $main = $('main').first();
  const $scope = $main.length ? $main : $('body').first();
  const majorTitle = normalize($scope.find('h1').first().text());
  const docTitle = normalize($('title').first().text());
  const title = majorTitle || docTitle || file.replace(/\.html$/i, '');
  const isIndex = file.toLowerCase() === 'index.html';
  const codeMatch = file.match(/^(\d+)/);
  const code = isIndex ? '总' : (codeMatch ? codeMatch[1].padStart(2, '0') : '');
  let shortTitle = isIndex
    ? '总览'
    : (title.includes('·') ? title.split('·').slice(1).join('·').trim() : title);
  shortTitle = normalize(shortTitle) || title;

  const groups = [];
  const panels = $scope.find('section.am-panel').toArray();
  if (panels.length) {
    for (const [index, element] of panels.entries()) {
      const $panel = $(element);
      groups.push({
        element: $panel,
        id: normalize($panel.attr('id')) || `section-${index + 1}`,
        heading: normalize($panel.find('h2').first().text()),
      });
    }
  } else {
    groups.push({ element: $scope, id: '', heading: title });
  }

  const sections = [];
  let allText = '';
  for (const group of groups) {
    const $clone = group.element.clone();
    $clone.find(NOISE).remove();

    const pieces = [];
    $clone.find(BLOCKS).each((_, element) => {
      const $element = $(element);
      if ($element.find(BLOCKS).length) return;
      const text = normalize($element.text());
      if (text) pieces.push(text);
    });

    const heading = group.heading || title;
    while (pieces.length && pieces[0] === heading) pieces.shift();
    let text = normalize(pieces.join(' '));
    if (text.length > SEARCH_LIMIT) text = text.slice(0, SEARCH_LIMIT);
    allText += ` ${heading} ${text}`;
    sections.push({
      id: group.id,
      title: heading,
      heading,
      text,
    });
  }

  return {
    page: {
      id: file.replace(/\.html$/i, ''),
      file,
      href: `kb/${slug}/${encodeURIComponent(file)}`,
      title,
      shortTitle,
      code,
      kind: isIndex ? 'overview' : 'doc',
      chars: charCount(allText),
      sections: sections.map(({ id, title: sectionTitle }) => ({ id, title: sectionTitle })),
    },
    searchDoc: {
      pageId: file.replace(/\.html$/i, ''),
      pageTitle: title,
      pageShort: shortTitle,
      file,
      href: `kb/${slug}/${encodeURIComponent(file)}`,
      sections: sections.map(({ id, heading, text }) => ({ id, heading, text })),
    },
  };
}

function validateConfig(config) {
  if (!config || typeof config !== 'object') throw new Error('kbs.json 不是有效对象。');
  if (!Array.isArray(config.kbs) || config.kbs.length === 0) throw new Error('kbs.json 里没有知识库。');
  const seen = new Set();
  for (const kb of config.kbs) {
    if (!kb.slug || !/^[a-z0-9][a-z0-9-]*$/.test(kb.slug)) {
      throw new Error(`知识库 slug 无效：${escapeForLog(kb.slug)}（只能用小写字母、数字和连字符）。`);
    }
    if (seen.has(kb.slug)) throw new Error(`知识库 slug 重复：${kb.slug}`);
    seen.add(kb.slug);
    if (!kb.source || typeof kb.source !== 'string') {
      throw new Error(`知识库 ${kb.slug} 缺少 source。`);
    }
    const sourceDir = path.resolve(root, kb.source);
    if (sourceDir !== root && !sourceDir.startsWith(root + path.sep)) {
      throw new Error(`知识库 ${kb.slug} 的 source 必须在仓库目录内：${kb.source}`);
    }
  }
}

export async function build() {
  const started = Date.now();
  if (!isDirectory(siteDir)) throw new Error(`找不到站点源目录：${siteDir}`);
  const config = JSON.parse(await fsp.readFile(configPath, 'utf8'));
  validateConfig(config);

  await fsp.rm(tmpDir, { recursive: true, force: true });
  await fsp.mkdir(tmpDir, { recursive: true });
  await copyTree(siteDir, tmpDir, { skipMarkdown: false });

  const manifestKbs = [];
  const searchPayloads = new Map();
  let latestUpdated = '';

  for (const [configIndex, raw] of config.kbs.entries()) {
    const sourceDir = path.resolve(root, raw.source);
    const sourceExists = isDirectory(sourceDir);
    const sourceRelative = path.relative(root, sourceDir).split(path.sep).join('/');
    const planned = raw.status === 'planned';

    if (!sourceExists && !planned) {
      throw new Error(`知识库 ${raw.slug} 的目录不存在：${raw.source}`);
    }

    let files = [];
    if (sourceExists) {
      files = (await fsp.readdir(sourceDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && /\.html?$/i.test(entry.name))
        .map((entry) => entry.name)
        .sort(pageSort);
    }

    const updatedAt = sourceExists
      ? (lastGitDate(sourceRelative) || await newestMtime(sourceDir, files))
      : null;

    if (planned) {
      manifestKbs.push({
        slug: raw.slug,
        title: raw.title || raw.slug,
        subtitle: raw.subtitle ?? '内容筹备中',
        description: raw.description || '',
        tags: Array.isArray(raw.tags) ? raw.tags : [],
        unit: raw.unit || '篇',
        accent: raw.accent || '#3f6675',
        order: Number.isFinite(raw.order) ? raw.order : 999,
        status: 'planned',
        updatedAt,
        pageCount: 0,
        chapterCount: 0,
        charCount: 0,
        pages: [],
        searchHref: null,
      });
      continue;
    }

    if (!files.length) {
      log(`  · ${raw.slug}：目录存在，但还没有 HTML 页面。`);
      manifestKbs.push({
        slug: raw.slug,
        title: raw.title || raw.slug,
        subtitle: raw.subtitle || '暂无页面',
        description: raw.description || '',
        tags: Array.isArray(raw.tags) ? raw.tags : [],
        unit: raw.unit || '篇',
        accent: raw.accent || '#a94f2a',
        order: Number.isFinite(raw.order) ? raw.order : 999,
        status: 'empty',
        updatedAt,
        pageCount: 0,
        chapterCount: 0,
        charCount: 0,
        pages: [],
        searchHref: null,
      });
      continue;
    }

    const kbDir = path.join(tmpDir, 'kb', raw.slug);
    await copyTree(sourceDir, kbDir);

    const pages = [];
    const docs = [];
    for (const file of files) {
      const copiedFile = path.join(kbDir, file);
      await injectHostStyle(copiedFile);
      const html = await fsp.readFile(copiedFile, 'utf8');
      const extracted = extractPage(html, file, raw.slug);
      pages.push(extracted.page);
      docs.push(extracted.searchDoc);
    }

    // Give pages without a numeric filename prefix a stable two-digit label.
    let nextCode = 1;
    for (const page of pages) {
      if (page.code) continue;
      let candidate;
      do {
        candidate = String(nextCode++).padStart(2, '0');
      } while (pages.some((other) => other.code === candidate));
      page.code = candidate;
    }

    const chapterCount = pages.filter((page) => page.kind === 'doc').length;
    const charCountTotal = pages.reduce((sum, page) => sum + page.chars, 0);
    const searchHref = `data/search-${raw.slug}.json`;
    searchPayloads.set(raw.slug, {
      kb: raw.slug,
      generatedAt: new Date().toISOString(),
      docs,
    });

    manifestKbs.push({
      slug: raw.slug,
      title: raw.title || pages[0].shortTitle || raw.slug,
      subtitle: raw.subtitle || '',
      description: raw.description || '',
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      unit: raw.unit || '篇',
      accent: raw.accent || '#a94f2a',
      order: Number.isFinite(raw.order) ? raw.order : 999,
      status: 'active',
      updatedAt,
      pageCount: pages.length,
      chapterCount,
      charCount: charCountTotal,
      pages,
      searchHref,
    });

    if (updatedAt && updatedAt > latestUpdated) latestUpdated = updatedAt;
    log(`  · ${raw.slug}：${pages.length} 页，${chapterCount} ${raw.unit || '篇'}，${charCountTotal} 字。`);
  }

  manifestKbs.sort((a, b) => (a.order - b.order) || a.slug.localeCompare(b.slug));

  const manifest = {
    site: {
      ...config.site,
      generatedAt: new Date().toISOString(),
      latestUpdated: latestUpdated || null,
    },
    kbs: manifestKbs,
  };

  await fsp.mkdir(path.join(tmpDir, 'data'), { recursive: true });
  await fsp.writeFile(
    path.join(tmpDir, 'data', 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  );

  let searchBytes = 0;
  for (const [slug, payload] of searchPayloads) {
    const body = JSON.stringify(payload);
    searchBytes += Buffer.byteLength(body);
    await fsp.writeFile(path.join(tmpDir, 'data', `search-${slug}.json`), body, 'utf8');
  }

  await fsp.rm(distDir, { recursive: true, force: true });
  await fsp.rename(tmpDir, distDir);

  const active = manifestKbs.filter((kb) => kb.status === 'active');
  const pageCount = active.reduce((sum, kb) => sum + kb.pageCount, 0);
  log('');
  log(`书架构建完成：${active.length} 个知识库，${pageCount} 个页面，搜索索引 ${(searchBytes / 1024).toFixed(0)} KB。`);
  log(`输出目录：${distDir}（${Date.now() - started} ms）`);
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((error) => {
    console.error('');
    console.error(`构建失败：${error.message}`);
    console.error(error.stack);
    process.exitCode = 1;
  });
}
