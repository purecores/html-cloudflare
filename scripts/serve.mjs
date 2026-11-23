import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteDir = path.join(root, 'site');
const configPath = path.join(root, 'kbs.json');
const port = Number(process.env.PORT || 4173);

const MIME = new Map(Object.entries({
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}));

function sendFile(req, res, file, status = 200) {
  const stat = fs.statSync(file);
  const type = MIME.get(path.extname(file).toLowerCase()) || 'application/octet-stream';
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': 'no-store',
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  fs.createReadStream(file).pipe(res);
}

function resolveRequestPath(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  } catch {
    return null;
  }
  if (pathname.endsWith('/')) pathname += 'index.html';
  if (pathname === '/') pathname = '/index.html';
  const resolved = path.normalize(path.join(distDir, pathname));
  if (resolved !== distDir && !resolved.startsWith(distDir + path.sep)) return null;
  return resolved;
}

await build();

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method Not Allowed');
    return;
  }
  const file = resolveRequestPath(req.url || '/');
  if (!file) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  try {
    let target = file;
    let stat = await fsp.stat(target);
    if (stat.isDirectory()) {
      target = path.join(target, 'index.html');
      stat = await fsp.stat(target);
    }
    sendFile(req, res, target);
  } catch {
    const notFound = path.join(distDir, '404.html');
    try {
      sendFile(req, res, notFound, 404);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log('');
  console.log(`本地预览：http://localhost:${port}`);
  console.log('改动 site/ 或知识库目录会自动重新构建。');
});

const watched = new Map();

function watchDir(dir) {
  if (!dir || watched.has(dir)) return;
  try {
    if (!fs.statSync(dir).isDirectory()) return;
  } catch {
    return;
  }
  try {
    const watcher = fs.watch(dir, { recursive: true }, triggerRebuild);
    watcher.on('error', () => {});
    watched.set(dir, watcher);
  } catch (error) {
    console.warn(`无法监听目录：${dir}（${error.message}）`);
  }
}

function watchSettings() {
  let config = null;
  const loadConfig = async () => {
    try {
      config = JSON.parse(await fsp.readFile(configPath, 'utf8'));
    } catch {
      // The build already reported a config problem.
    }
  };

  watchDir(siteDir);
  const configTimer = { id: null };
  fs.watch(configPath, () => {
    clearTimeout(configTimer.id);
    configTimer.id = setTimeout(async () => {
      await loadConfig();
      watchDir(siteDir);
      for (const kb of Array.isArray(config?.kbs) ? config.kbs : []) {
        if (kb?.source) watchDir(path.resolve(root, kb.source));
      }
      await rebuild();
    }, 180);
  });

  loadConfig().then(() => {
    for (const kb of Array.isArray(config?.kbs) ? config.kbs : []) {
      if (kb?.source) watchDir(path.resolve(root, kb.source));
    }
  });
}

let rebuildTimer;
let rebuilding = false;
let rebuildAgain = false;

async function rebuild() {
  if (rebuilding) {
    rebuildAgain = true;
    return;
  }
  rebuilding = true;
  try {
    await build();
    console.log('已重新构建。刷新浏览器即可看到改动。');
  } catch (error) {
    console.error(`重新构建失败：${error.message}`);
  } finally {
    rebuilding = false;
    if (rebuildAgain) {
      rebuildAgain = false;
      triggerRebuild();
    }
  }
}

function triggerRebuild() {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(rebuild, 180);
}

watchSettings();
