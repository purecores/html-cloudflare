/* ==========================================================================
   知识库 · HTML 阅读器
   ========================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const THEME_KEY = 'kb-theme';
const LAST_KEY = 'kb-last';
const SVG_NS = 'http://www.w3.org/2000/svg';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const wideLayout = window.matchMedia('(min-width: 921px)');

const els = {
  topbar: $('.topbar'),
  menuBtn: $('#menu-btn'),
  crumb: $('#crumb'),
  crumbKb: $('#crumb-kb'),
  crumbPage: $('#crumb-page'),
  searchBtn: $('#search-btn'),
  heroSearch: $('#hero-search'),
  heroSearchLabel: $('#hero-search-label'),
  rawLink: $('#raw-link'),
  settingsBtn: $('#settings-btn'),
  repoLink: $('#repo-link'),
  footerRepo: $('#footer-repo'),
  home: $('#home-view'),
  reader: $('#reader-view'),
  readerTitle: $('#reader-title'),
  statKbs: $('#stat-kbs'),
  statDocs: $('#stat-docs'),
  statChars: $('#stat-chars'),
  shelfList: $('#shelf-list'),
  shelfNote: $('#shelf-note'),
  resume: $('#resume'),
  sideKb: $('#side-kb'),
  sideSub: $('#side-sub'),
  chapterList: $('#chapter-list'),
  outlineList: $('#outline-list'),
  sideChars: $('#side-chars'),
  drawer: $('#drawer'),
  drawerTitle: $('#drawer-title'),
  drawerChapters: $('#drawer-chapters'),
  drawerOutline: $('#drawer-outline'),
  drawerRepo: $('#drawer-repo'),
  sheet: $('#sheet'),
  frame: $('#content-frame'),
  loadBar: $('#load-bar'),
  prevLink: $('#prev-link'),
  prevTitle: $('#prev-title'),
  pageCount: $('#page-count'),
  nextLink: $('#next-link'),
  nextTitle: $('#next-title'),
  searchDialog: $('#search-dialog'),
  searchInput: $('#search-input'),
  searchStatus: $('#search-status'),
  searchResults: $('#search-results'),
  settingsDialog: $('#settings-dialog'),
  settingsRaw: $('#settings-raw'),
  settingsRepo: $('#settings-repo'),
  toast: $('#toast'),
};

let manifest = null;
let current = { kb: null, page: null, anchor: null };
let frameHref = null;
let currentSections = [];
let homeScrollY = 0;
let toastTimer = 0;
let activeOutlineKey = '';
let scrollRaf = 0;
let hadPage = false;

let pagefind = null;
let pagefindPromise = null;
let pagefindError = null;
let searchQuery = '';
let searchTimer = 0;
let searchResults = [];
let activeResult = -1;
let searchRequest = 0;

const boundDocs = new WeakSet();

/* --------------------------------------------------------------------------
   Small DOM helpers
   -------------------------------------------------------------------------- */

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') {
      node.className = value;
    } else if (key === 'text') {
      node.textContent = value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataValue] of Object.entries(value)) node.dataset[dataKey] = dataValue;
    } else if (key === 'style') {
      for (const [styleKey, styleValue] of Object.entries(value)) node.style.setProperty(styleKey, styleValue);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value === true ? '' : String(value));
    }
  }
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function icon(name, className = 'icon') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#${name}`);
  svg.append(use);
  return svg;
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatChars(value) {
  const n = Number(value) || 0;
  if (n >= 10000) {
    return `${(n / 10000).toFixed(1).replace(/\.0$/, '')} 万字`;
  }
  return `${n} 字`;
}

function formatCompact(value) {
  const n = Number(value) || 0;
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, '')} 万`;
  return String(n);
}

function hrefFor(kb, page, anchor = '') {
  const base = `#/kb/${encodeURIComponent(kb.slug)}/${encodeURIComponent(page.id)}`;
  return anchor ? `${base}/${encodeURIComponent(anchor)}` : base;
}

function showToast(message) {
  if (!message) return;
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 3400);
}

/* --------------------------------------------------------------------------
   Theme and type size
   -------------------------------------------------------------------------- */

function readTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(value, { persist = true } = {}) {
  const theme = value === 'light' || value === 'dark' ? value : 'system';
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute('content', theme === 'system' ? 'light dark' : theme);
  document.documentElement.style.colorScheme = theme === 'system' ? 'light dark' : theme;
  if (persist) {
    try {
      if (theme === 'system') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The selected theme still applies for this page.
    }
  }
  for (const radio of $$('input[name="theme"]', els.settingsDialog)) {
    radio.checked = radio.value === theme;
  }
  syncFrameTheme();
}

function syncFrameTheme() {
  const doc = els.frame.contentDocument;
  if (!doc || !doc.documentElement) return;
  const theme = readTheme();
  const mode = theme === 'system' ? 'auto' : theme;
  doc.documentElement.setAttribute('data-mode', mode);
  const select = doc.querySelector('select[data-am="mode"]');
  if (select) select.value = mode;
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */

async function init() {
  detectPlatform();
  applyTheme(readTheme(), { persist: false });
  bindStaticEvents();

  try {
    const [libraryResponse, indexResponse] = await Promise.all([
      fetch('data/library.json', { cache: 'no-cache' }),
      fetch('index.json', { cache: 'no-cache' }),
    ]);
    if (!libraryResponse.ok) throw new Error(`library.json HTTP ${libraryResponse.status}`);
    if (!indexResponse.ok) throw new Error(`index.json HTTP ${indexResponse.status}`);
    const [library, index] = await Promise.all([libraryResponse.json(), indexResponse.json()]);
    manifest = buildManifest(library, index);
  } catch (error) {
    console.error('读取书架失败', error);
    renderBootError(error);
    return;
  }

  setupSiteMeta();
  renderHome();
  route();
}

function pageCode(entry, kind, index) {
  if (kind === 'overview') return '总';
  const raw = String(entry.code ?? '').trim();
  if (/^\d+$/.test(raw)) return raw.padStart(2, '0');
  if (raw) return raw;
  const match = String(entry.file || '').match(/^(\d+)/);
  if (match) return match[1].padStart(2, '0');
  return String(index + 1).padStart(2, '0');
}

function buildManifest(library, index) {
  const entries = Array.isArray(index) ? index.filter((entry) => entry && entry.kb && entry.file) : [];
  const kbs = (Array.isArray(library.kbs) ? library.kbs : []).map((raw) => {
    const pages = entries
      .filter((entry) => entry.kb === raw.slug)
      .map((entry, entryIndex) => {
        const file = String(entry.file);
        const kind = entry.kind === 'overview' ? 'overview' : 'doc';
        return {
          id: String(entry.id || file.replace(/\.html?$/i, '')),
          file,
          href: `kb/${encodeURIComponent(raw.slug)}/${encodeURIComponent(file)}`,
          title: String(entry.title || file),
          shortTitle: String(entry.short || entry.title || file),
          code: pageCode(entry, kind, entryIndex),
          kind,
          chars: Number(entry.chars) || 0,
        };
      });

    pages.sort((a, b) => {
      const aOverview = a.kind === 'overview';
      const bOverview = b.kind === 'overview';
      if (aOverview !== bOverview) return aOverview ? -1 : 1;
      const aNumber = a.file.match(/^(\d+)/);
      const bNumber = b.file.match(/^(\d+)/);
      if (aNumber && bNumber) {
        const diff = Number(aNumber[1]) - Number(bNumber[1]);
        if (diff) return diff;
      } else if (aNumber) {
        return -1;
      } else if (bNumber) {
        return 1;
      }
      return a.file.localeCompare(b.file, 'zh-CN');
    });

    return {
      ...raw,
      status: pages.length ? 'active' : (raw.status || 'planned'),
      pageCount: pages.length,
      chapterCount: pages.filter((page) => page.kind === 'doc').length,
      charCount: pages.reduce((sum, page) => sum + page.chars, 0),
      pages,
    };
  });

  return {
    site: { ...(library.site || {}), title: library.site?.title || '知识库' },
    kbs,
  };
}

function detectPlatform() {
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  const label = isMac ? '⌘ K' : 'Ctrl K';
  for (const node of $$('[data-kbd]')) node.textContent = label;
}

function setupSiteMeta() {
  const site = manifest.site || {};
  const title = site.title || '知识库';
  for (const node of $$('.brand-name')) node.textContent = title;
  const heroTitle = $('#hero-title');
  if (heroTitle) heroTitle.textContent = title;
  const description = $('meta[name="description"]');
  if (description && site.description) description.setAttribute('content', site.description);

  if (site.repo) {
    for (const link of [els.repoLink, els.footerRepo, els.settingsRepo, els.drawerRepo]) {
      if (link) link.href = site.repo;
    }
  }

  const active = manifest.kbs.filter((kb) => kb.status === 'active');
  const docs = active.reduce((sum, kb) => sum + kb.pageCount, 0);
  const chars = active.reduce((sum, kb) => sum + kb.charCount, 0);
  els.statKbs.textContent = String(manifest.kbs.length);
  els.statDocs.textContent = String(docs);
  els.statChars.textContent = formatCompact(chars);
  els.heroSearchLabel.textContent = docs ? `搜索 ${docs} 篇文档` : '搜索全部内容';
  els.shelfNote.textContent = site.latestUpdated
    ? `${manifest.kbs.length} 个知识库 · 更新 ${site.latestUpdated}`
    : `${manifest.kbs.length} 个知识库`;
  document.title = `${title} · HTML 阅读器`;
}

function renderBootError(error) {
  els.shelfNote.textContent = '无法读取书架';
  els.shelfList.replaceChildren(
    el(
      'div',
      { class: 'boot-error' },
      el('h3', {}, '书架读取失败'),
      el('p', {}, '请检查 data/library.json 和 index.json 是否存在，或运行 npm run build 后再试。'),
      el(
        'button',
        {
          type: 'button',
          onclick: () => window.location.reload(),
        },
        '重新加载',
      ),
    ),
  );
  console.error(error);
}

/* --------------------------------------------------------------------------
   Home
   -------------------------------------------------------------------------- */

function renderHome() {
  renderShelf();
  renderResume();
}

function renderShelf() {
  const rows = manifest.kbs.map((kb, index) => makeShelfRow(kb, index));
  els.shelfList.replaceChildren(...(rows.length ? rows : [el('p', { class: 'boot' }, '书架还是空的。')]));
}

function makeShelfRow(kb, index) {
  const active = kb.status === 'active' && kb.pageCount > 0;
  const overview = kb.pages.find((page) => page.kind === 'overview') || kb.pages[0] || null;
  const docs = kb.pages.filter((page) => page.kind === 'doc');
  const row = el('article', { class: `kb-row${active ? '' : ' is-planned'}` });
  row.style.setProperty('--kb-accent', kb.accent || 'var(--copper)');

  const badgeText = active
    ? `${kb.chapterCount} ${kb.unit || '篇'}`
    : (kb.status === 'planned' ? '筹备中' : '暂无页面');
  const plate = el(
    'div',
    { class: 'kb-plate' },
    el('span', { class: 'kb-code' }, `KB-${String(index + 1).padStart(2, '0')}`),
    el('span', { class: `kb-badge${active ? '' : ' is-planned'}` }, badgeText),
  );

  const body = el('div', { class: 'kb-body' });
  const title = active && overview
    ? el('h3', { class: 'kb-title' }, el('a', { href: hrefFor(kb, overview) }, kb.title))
    : el('h3', { class: 'kb-title' }, kb.title);
  body.append(title);
  if (kb.subtitle) body.append(el('p', { class: 'kb-sub' }, kb.subtitle));
  if (kb.description) body.append(el('p', { class: 'kb-desc' }, kb.description));

  if (kb.tags && kb.tags.length) {
    body.append(el('ul', { class: 'kb-tags' }, ...kb.tags.map((tag) => el('li', {}, tag))));
  }

  if (active) {
    const meta = el('p', { class: 'kb-meta' });
    meta.append(
      el('span', {}, `${kb.pageCount} 页`),
      el('span', {}, formatChars(kb.charCount)),
    );
    if (kb.updatedAt) meta.append(el('span', {}, `更新 ${kb.updatedAt}`));
    body.append(meta);

    if (docs.length) {
      const list = el('ol', { class: 'chapter-list' });
      for (const doc of docs.slice(0, 12)) {
        list.append(
          el(
            'li',
            {},
            el(
              'a',
              { href: hrefFor(kb, doc) },
              el('span', { class: 'ch-code' }, doc.code || '·'),
              el('span', { class: 'ch-title' }, doc.shortTitle),
            ),
          ),
        );
      }
      body.append(list);
      if (docs.length > 12) {
        body.append(
          el(
            'a',
            { class: 'kb-more', href: hrefFor(kb, overview || docs[0]) },
            `还有 ${docs.length - 12} ${kb.unit || '篇'}，从总览进入`,
          ),
        );
      }
    } else if (overview) {
      body.append(el('a', { class: 'kb-more', href: hrefFor(kb, overview) }, '打开总览'));
    }
  } else if (!kb.description) {
    body.append(
      el(
        'p',
        { class: 'kb-planned-note' },
        kb.status === 'planned'
          ? '把 HTML 页面放进对应文件夹，重新构建后就会出现在书架上。'
          : '这个知识库还没有页面。',
      ),
    );
  }

  const side = el('div', { class: 'kb-side' });
  if (active) {
    side.append(
      el(
        'div',
        { class: 'kb-side-meta' },
        el('strong', {}, `${kb.chapterCount} ${kb.unit || '篇'}`),
        el('span', {}, '全文可检索'),
      ),
    );
    side.append(
      el(
        'a',
        { class: 'kb-enter', href: hrefFor(kb, overview) },
        overview && overview.kind === 'overview' ? '从总览开始' : '开始阅读',
        icon('i-arrow-right'),
      ),
    );
  } else {
    side.append(
      el(
        'div',
        { class: 'kb-side-meta' },
        el('strong', {}, kb.status === 'planned' ? '尚未发布' : '暂无页面'),
      ),
    );
  }

  row.append(plate, body, side);
  return row;
}

function renderResume() {
  if (!manifest || !els.resume) return;
  let last = null;
  try {
    last = JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
  } catch {
    last = null;
  }
  if (!last || !last.slug || !last.pageId) {
    els.resume.hidden = true;
    els.resume.replaceChildren();
    return;
  }
  const kb = manifest.kbs.find((candidate) => candidate.slug === last.slug && candidate.status === 'active');
  const page = kb && kb.pages.find((candidate) => candidate.id === last.pageId);
  if (!kb || !page) {
    els.resume.hidden = true;
    els.resume.replaceChildren();
    return;
  }
  const label = page.kind === 'overview' ? '总览' : page.shortTitle;
  els.resume.replaceChildren(
    el(
      'a',
      { href: hrefFor(kb, page) },
      el('span', { class: 'resume-label' }, '继续阅读'),
      el('span', { class: 'resume-title' }, `${kb.title} / ${label}`),
      icon('i-arrow-right'),
    ),
  );
  els.resume.hidden = false;
}

function saveLast(kb, page) {
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify({ slug: kb.slug, pageId: page.id, at: Date.now() }));
  } catch {
    // Reading still works if storage is unavailable.
  }
}

/* --------------------------------------------------------------------------
   Routing
   -------------------------------------------------------------------------- */

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  if (!raw) return { view: 'home' };
  const parts = raw.split('/').filter(Boolean).map(safeDecode);
  if (parts[0] === 'kb' && parts[1]) {
    return {
      view: 'reader',
      slug: parts[1],
      pageId: parts[2] || null,
      anchor: parts[3] || null,
    };
  }
  return { view: 'home' };
}

function route() {
  if (!manifest) return;
  const next = parseHash();
  if (next.view !== 'reader') {
    showHome();
    return;
  }

  const kb = manifest.kbs.find((candidate) => candidate.slug === next.slug);
  if (!kb || kb.status !== 'active' || !kb.pages.length) {
    history.replaceState(null, '', '#/');
    showHome();
    if (next.slug) showToast('没有找到这个知识库。');
    return;
  }

  let page = next.pageId ? kb.pages.find((candidate) => candidate.id === next.pageId) : null;
  if (!page) {
    page = kb.pages.find((candidate) => candidate.kind === 'overview') || kb.pages[0];
    history.replaceState(null, '', hrefFor(kb, page, next.anchor));
  }

  showReader(kb, page, next.anchor);
}

function showHome() {
  const wasReading = document.body.classList.contains('reading');
  document.body.classList.remove('reading');
  els.home.hidden = false;
  els.reader.hidden = true;
  els.crumb.hidden = true;
  els.menuBtn.hidden = true;
  els.rawLink.hidden = true;
  els.repoLink.hidden = false;
  els.menuBtn.setAttribute('aria-expanded', 'false');
  if (els.drawer.open) els.drawer.close();
  els.loadBar.hidden = true;
  current = { kb: null, page: null, anchor: null };
  hadPage = false;
  document.title = `${manifest?.site?.title || '知识库'} · HTML 阅读器`;
  renderResume();
  if (wasReading) {
    window.setTimeout(() => window.scrollTo(0, homeScrollY), 0);
  }
}

function showReader(kb, page, anchor) {
  const wasReading = document.body.classList.contains('reading');
  const previousAnchor = current.anchor;
  if (!wasReading) homeScrollY = window.scrollY;
  const isNewPage = !current.page || current.kb?.slug !== kb.slug || current.page.id !== page.id;

  current = { kb, page, anchor: anchor || null };
  if (isNewPage) currentSections = [];
  document.body.classList.add('reading');
  els.home.hidden = true;
  els.reader.hidden = false;

  els.crumb.hidden = false;
  els.crumbKb.textContent = kb.title;
  els.crumbPage.textContent = page.kind === 'overview' ? '总览' : page.shortTitle;
  els.menuBtn.hidden = false;
  els.rawLink.hidden = false;
  els.rawLink.href = page.href + (anchor ? `#${encodeURIComponent(anchor)}` : '');
  els.repoLink.hidden = false;

  const pageLabel = page.kind === 'overview' ? '总览' : page.shortTitle;
  els.readerTitle.textContent = `${pageLabel} · ${kb.title}`;
  els.sideKb.textContent = kb.title;
  els.sideSub.textContent = kb.subtitle || '';
  els.sideChars.textContent = formatChars(page.chars);
  els.drawerTitle.textContent = kb.title;

  renderChapterList(els.chapterList, kb, page);
  renderChapterList(els.drawerChapters, kb, page);
  renderOutline(els.outlineList, kb, page);
  renderOutline(els.drawerOutline, kb, page);
  renderPageNav(kb, page);
  syncSettingsRawLink();
  revealActiveChapter(els.chapterList);

  document.title = `${pageLabel} · ${kb.title}`;
  saveLast(kb, page);
  activeOutlineKey = '';

  const srcChanged = frameHref !== page.href;
  if (srcChanged) {
    els.loadBar.hidden = false;
    els.frame.title = `${pageLabel} · ${kb.title}`;
    navigateFrame(page.href);
  } else {
    syncFrameTheme();
    if (anchor) scrollToAnchor(anchor);
    else if (previousAnchor || !wasReading) scrollFrameTop();
    else updateOutlineActive(els.frame.contentDocument);
  }

  if (isNewPage && hadPage) {
    els.readerTitle.focus({ preventScroll: true });
  }
  hadPage = true;

  if (els.drawer.open) els.drawer.close();
}

function renderChapterList(container, kb, activePage) {
  const items = kb.pages.map((page) =>
    el(
      'li',
      {},
      el(
        'a',
        {
          href: hrefFor(kb, page),
          'aria-current': page.id === activePage.id ? 'page' : null,
        },
        el('span', { class: 'ch-code' }, page.kind === 'overview' ? '总' : page.code || '·'),
        el('span', { class: 'ch-title' }, page.kind === 'overview' ? '总览' : page.shortTitle),
      ),
    ),
  );
  container.replaceChildren(...items);
}

function extractSections(doc) {
  const sections = [];
  for (const node of doc.querySelectorAll('main section.am-panel')) {
    const titleNode = node.querySelector('h2');
    const title = (titleNode?.textContent || '').replace(/\s+/g, ' ').trim();
    if (node.id && title) sections.push({ id: node.id, title });
  }
  return sections;
}

function renderOutline(container, kb, page) {
  const sections = currentSections;
  const items = sections.map((section) =>
    el(
      'li',
      {},
      el(
        'a',
        {
          href: hrefFor(kb, page, section.id),
          dataset: section.id ? { section: section.id } : {},
        },
        section.title,
      ),
    ),
  );
  container.replaceChildren(...items);
  const nav = container.closest('nav');
  if (nav) nav.hidden = sections.length === 0;
}

function revealActiveChapter(container, { center = false } = {}) {
  const active = container?.querySelector('a[aria-current="page"]');
  if (active) active.scrollIntoView({ block: center ? 'center' : 'nearest' });
}

function renderPageNav(kb, page) {
  const index = kb.pages.findIndex((candidate) => candidate.id === page.id);
  const prev = index > 0 ? kb.pages[index - 1] : null;
  const next = index >= 0 && index < kb.pages.length - 1 ? kb.pages[index + 1] : null;

  setNavLink(els.prevLink, els.prevTitle, kb, prev);
  setNavLink(els.nextLink, els.nextTitle, kb, next);

  const currentNumber = String(index + 1).padStart(2, '0');
  const total = String(kb.pages.length).padStart(2, '0');
  els.pageCount.textContent = `${currentNumber} / ${total}`;
}

function setNavLink(link, titleNode, kb, page) {
  if (!page) {
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.removeAttribute('href');
    link.tabIndex = -1;
    titleNode.textContent = '';
    return;
  }
  link.classList.remove('is-disabled');
  link.removeAttribute('aria-disabled');
  link.href = hrefFor(kb, page);
  link.tabIndex = 0;
  titleNode.textContent = page.kind === 'overview' ? '总览' : page.shortTitle;
}

function syncSettingsRawLink() {
  if (!current.kb || !current.page) {
    els.settingsRaw.hidden = true;
    els.settingsRaw.removeAttribute('href');
    return;
  }
  els.settingsRaw.hidden = false;
  els.settingsRaw.href = current.page.href + (current.anchor ? `#${encodeURIComponent(current.anchor)}` : '');
}

/* --------------------------------------------------------------------------
   Content frame
   -------------------------------------------------------------------------- */

function navigateFrame(href) {
  frameHref = href;
  try {
    const win = els.frame.contentWindow;
    if (win) win.location.replace(href);
    else els.frame.src = href;
  } catch {
    els.frame.src = href;
  }
}

function handleFrameLoad() {
  if (!current.page || !frameHref) return;
  const doc = els.frame.contentDocument;
  if (!doc) return;

  ensureFrameStyle(doc);
  syncFrameTheme();
  bindContentDoc(doc);
  els.loadBar.hidden = true;

  currentSections = extractSections(doc);
  renderOutline(els.outlineList, current.kb, current.page);
  renderOutline(els.drawerOutline, current.kb, current.page);

  if (current.anchor) {
    scrollToAnchor(current.anchor);
  } else {
    updateOutlineActive(doc);
  }
}

function ensureFrameStyle(doc) {
  if (!doc.head || doc.getElementById('kb-host-frame-style')) return;
  const style = doc.createElement('style');
  style.id = 'kb-host-frame-style';
  style.textContent = `
    .kb-target { outline: 2px solid var(--accent, #a34b28); outline-offset: 6px; border-radius: 2px; }
    .am-export, .am-colophon, .am-reply, .am-reply-bar, .am-remark-hover, .am-remark-pop, .am-comment-btn,
    [data-am="reply"], [data-am="remark"], [data-am="copy"], [data-am="export"] { display: none !important; }
  `;
  doc.head.append(style);
}

function bindContentDoc(doc) {
  if (boundDocs.has(doc)) return;
  boundDocs.add(doc);

  doc.addEventListener(
    'click',
    (event) => {
      if (!current.kb || !current.page || event.defaultPrevented) return;
      const target = event.target.closest?.('a[href]') || null;
      if (!target) return;

      const raw = target.getAttribute('href');
      if (!raw || raw.startsWith('#')) return;
      if (/^(mailto:|tel:)/i.test(raw)) return;

      let url;
      try {
        url = new URL(raw, doc.baseURI);
      } catch {
        return;
      }
      if (!/^https?:$/.test(url.protocol)) return;

      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

      if (url.origin !== location.origin) {
        if (event.button !== 0) return;
        event.preventDefault();
        window.open(url.href, '_blank', 'noopener');
        return;
      }

      const file = safeDecode(url.pathname.split('/').pop() || '');
      if (/\.html?$/i.test(file)) {
        const page = current.kb.pages.find((candidate) => candidate.file.toLowerCase() === file.toLowerCase());
        if (!page) {
          event.preventDefault();
          showToast('这一页没有随知识库一起发布。');
          return;
        }
        const targetAnchor = url.hash ? safeDecode(url.hash.slice(1)) : '';
        const href = hrefFor(current.kb, page, targetAnchor);
        event.preventDefault();
        if (modified) {
          window.open(new URL(href, location.href).href, '_blank', 'noopener');
          return;
        }
        if (location.hash === href) route();
        else location.hash = href;
        return;
      }

      if (event.button !== 0) return;
      event.preventDefault();
      window.open(url.href, '_blank', 'noopener');
    },
    false,
  );

  doc.addEventListener(
    'scroll',
    () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (els.frame.contentDocument === doc) updateOutlineActive(doc);
      });
    },
    { passive: true, capture: true },
  );

  doc.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });
}

function scrollFrameTop() {
  const doc = els.frame.contentDocument;
  if (!doc) return;
  if (doc.scrollingElement) doc.scrollingElement.scrollTop = 0;
  else {
    if (doc.documentElement) doc.documentElement.scrollTop = 0;
    if (doc.body) doc.body.scrollTop = 0;
  }
  updateOutlineActive(doc);
}

function scrollToAnchor(anchor) {
  if (!anchor) return;
  const doc = els.frame.contentDocument;
  if (!doc) return;
  const target = doc.getElementById(anchor);
  if (!target) return;
  target.scrollIntoView({
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
    block: 'start',
  });
  target.classList.add('kb-target');
  window.setTimeout(() => target.classList.remove('kb-target'), 2200);
  window.setTimeout(() => updateOutlineActive(doc), 80);
}

function updateOutlineActive(doc) {
  if (!doc || !current.page) return;
  const sections = currentSections;
  let activeId = null;
  if (sections.length) {
    activeId = sections[0].id || null;
    for (const section of sections) {
      if (!section.id) continue;
      const node = doc.getElementById(section.id);
      if (!node) continue;
      if (node.getBoundingClientRect().top <= 150) activeId = section.id;
    }
  }
  const key = `${current.page.id}:${activeId || ''}`;
  if (key === activeOutlineKey) return;
  activeOutlineKey = key;
  for (const link of $$('[data-section]')) {
    if (activeId && link.dataset.section === activeId) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

/* --------------------------------------------------------------------------
   Drawer / dialogs
   -------------------------------------------------------------------------- */

function openDrawer() {
  if (!current.kb) return;
  if (!els.drawer.open) {
    els.drawer.showModal();
    els.menuBtn.setAttribute('aria-expanded', 'true');
    const close = $('[data-close="drawer"]', els.drawer);
    if (close) close.focus();
    revealActiveChapter(els.drawerChapters, { center: true });
  }
}

function openSearch() {
  if (!manifest) return;
  if (els.searchDialog.open) {
    els.searchInput.focus();
    return;
  }
  els.searchInput.value = '';
  searchQuery = '';
  clearTimeout(searchTimer);
  activeResult = -1;
  searchResults = [];
  els.searchResults.replaceChildren();
  els.searchInput.removeAttribute('aria-activedescendant');
  renderSearchIdle();
  els.searchDialog.showModal();
  requestAnimationFrame(() => els.searchInput.focus());
  ensurePagefind()
    .then(() => {
      if (els.searchDialog.open && !els.searchInput.value.trim()) renderSearchIdle();
    })
    .catch(() => {
      if (els.searchDialog.open) renderSearchIdle();
    });
}

function openSettings() {
  if (!els.settingsDialog.open) {
    for (const radio of $$('input[name="theme"]', els.settingsDialog)) {
      radio.checked = radio.value === readTheme();
    }
    syncSettingsRawLink();
    els.settingsDialog.showModal();
  }
  const checked = $('input[name="theme"]:checked', els.settingsDialog);
  requestAnimationFrame(() => (checked || els.settingsDialog).focus());
}

function enableLightDismiss(dialog) {
  let downOutside = false;
  const outside = (event) => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', (event) => {
    downOutside = outside(event);
  });
  dialog.addEventListener('pointerup', (event) => {
    if (downOutside && outside(event)) dialog.close();
    downOutside = false;
  });
}

/* --------------------------------------------------------------------------
   Search
   -------------------------------------------------------------------------- */

function documentCount() {
  return manifest
    ? manifest.kbs.filter((kb) => kb.status === 'active').reduce((sum, kb) => sum + kb.pageCount, 0)
    : 0;
}

function pagefindModuleUrl() {
  return new URL('pagefind/pagefind.js', document.baseURI).href;
}

async function ensurePagefind() {
  if (pagefind) return pagefind;
  if (pagefindPromise) return pagefindPromise;
  if (pagefindError) throw pagefindError;
  if (els.searchDialog.open) {
    els.searchStatus.textContent = '正在读取全文索引…';
    if (!els.searchResults.childElementCount) {
      els.searchResults.replaceChildren(el('div', { class: 'search-empty' }, el('p', {}, '正在读取全文索引…')));
    }
  }
  pagefindPromise = import(pagefindModuleUrl())
    .then((module) => {
      pagefind = module;
      return module;
    })
    .catch((error) => {
      pagefindError = error;
      console.error('Pagefind 加载失败', error);
      throw error;
    })
    .finally(() => {
      pagefindPromise = null;
    });
  return pagefindPromise;
}

function renderSearchIdle() {
  if (pagefindError) {
    els.searchStatus.textContent = '全文索引读取失败';
    els.searchResults.replaceChildren(
      el('div', { class: 'search-empty' }, el('p', {}, '全文索引加载失败，请刷新页面后重试。')),
    );
    return;
  }
  if (!pagefind) {
    els.searchStatus.textContent = '正在读取全文索引…';
    els.searchResults.replaceChildren(
      el('div', { class: 'search-empty' }, el('p', {}, '正在读取全文索引…')),
    );
    return;
  }

  const active = manifest ? manifest.kbs.filter((kb) => kb.status === 'active') : [];
  const docs = documentCount();
  if (!docs) {
    els.searchStatus.textContent = '书架里还没有可搜索的文档';
    els.searchResults.replaceChildren(
      el('div', { class: 'search-empty' }, el('p', {}, '书架里还没有可搜索的文档。')),
    );
    return;
  }

  els.searchStatus.textContent = `全文检索 · ${docs} 篇文档`;
  const tags = [];
  for (const kb of active) {
    for (const tag of kb.tags || []) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }

  const empty = el('div', { class: 'search-empty' });
  empty.append(el('p', {}, '输入关键词，搜索章节标题与正文。'));
  empty.append(el('p', {}, '支持中文和英文，多个词之间用空格分隔。'));
  if (tags.length) {
    const chips = el('div', { class: 'search-chips' });
    for (const tag of tags.slice(0, 10)) {
      chips.append(el('button', { class: 'search-chip', type: 'button', dataset: { query: tag } }, tag));
    }
    empty.append(chips);
  }
  els.searchResults.replaceChildren(empty);
  els.searchInput.removeAttribute('aria-activedescendant');
  activeResult = -1;
  searchResults = [];
}

function mapPagefindResult(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl, location.origin);
  } catch {
    return null;
  }
  const parts = url.pathname.split('/').filter(Boolean).map(safeDecode);
  if (parts[0] !== 'kb' || !parts[1]) return null;
  const slug = parts[1];
  let file = parts[2] || 'index.html';
  if (url.pathname.endsWith('/') || !file) file = 'index.html';
  if (!/\.[a-z0-9]+$/i.test(file)) file += '.html';
  const anchor = url.hash ? safeDecode(url.hash.slice(1)) : '';
  const kb = manifest.kbs.find((candidate) => candidate.slug === slug);
  if (!kb) return null;
  const page = kb.pages.find(
    (candidate) =>
      candidate.file.toLowerCase() === file.toLowerCase() ||
      candidate.id === file.replace(/\.html?$/i, ''),
  );
  if (!page) return null;
  return { kb, page, anchor };
}

async function runSearch(rawQuery) {
  const query = String(rawQuery || '').trim();
  searchQuery = query;
  if (!query) {
    renderSearchIdle();
    return;
  }
  if (!pagefind) {
    try {
      await ensurePagefind();
    } catch {
      if (els.searchDialog.open) renderSearchIdle();
      return;
    }
  }
  if (!els.searchDialog.open) return;

  const request = ++searchRequest;
  els.searchStatus.textContent = `正在搜索「${query}」…`;
  try {
    const search = await pagefind.search(query);
    if (request !== searchRequest || !els.searchDialog.open) return;
    const results = [];
    for (const item of search.results || []) {
      if (results.length >= 60) break;
      let data;
      try {
        data = await item.data();
      } catch {
        continue;
      }
      const mapped = mapPagefindResult(data.url);
      if (!mapped) continue;
      results.push({
        kb: mapped.kb,
        page: mapped.page,
        href: hrefFor(mapped.kb, mapped.page, mapped.anchor),
        excerpt: data.excerpt || '',
      });
    }
    if (request !== searchRequest || !els.searchDialog.open) return;
    renderSearchResults(results, query);
  } catch (error) {
    if (request !== searchRequest) return;
    console.error('搜索失败', error);
    els.searchStatus.textContent = '搜索失败，请稍后重试';
    els.searchResults.replaceChildren(
      el('div', { class: 'search-empty' }, el('p', {}, '搜索暂时不可用，请刷新页面后重试。')),
    );
    searchResults = [];
    activeResult = -1;
    els.searchInput.removeAttribute('aria-activedescendant');
  }
}

function renderSearchResults(results, query) {
  searchResults = results;
  activeResult = -1;
  els.searchInput.removeAttribute('aria-activedescendant');
  els.searchResults.replaceChildren();

  if (!results.length) {
    els.searchStatus.textContent = `没有找到「${query}」`;
    els.searchResults.replaceChildren(
      el(
        'div',
        { class: 'search-empty' },
        el('p', {}, '没有找到相关内容。'),
        el('p', {}, '试试更短的关键词，或换一个术语。'),
      ),
    );
    return;
  }

  els.searchStatus.textContent = `找到 ${results.length} 条结果`;
  const fragment = document.createDocumentFragment();
  results.forEach((result, index) => {
    const page = result.page;
    const pageLabel = page.kind === 'overview' ? '总览' : page.shortTitle;
    const meta = el('div', { class: 'search-result-meta' });
    meta.append(el('span', { class: 'sr-kb' }, result.kb.title));
    meta.append(el('span', {}, page.kind === 'overview' ? '总览' : page.code || ''));
    const title = el('div', { class: 'search-result-title' }, pageLabel);
    const snippet = el('div', { class: 'search-result-snippet' });
    if (result.excerpt) snippet.innerHTML = result.excerpt;
    else snippet.textContent = page.title;

    const link = el(
      'a',
      {
        class: 'search-result',
        href: result.href,
        role: 'option',
        id: `search-option-${index}`,
        tabindex: '-1',
        title: page.title,
        'aria-selected': 'false',
        dataset: { result: String(index) },
      },
      meta,
      title,
      snippet,
    );
    fragment.append(link);
  });
  els.searchResults.append(fragment);
}

function setActiveResult(index) {
  if (!searchResults.length) return;
  const clamped = Math.max(-1, Math.min(index, searchResults.length - 1));
  for (const node of $$('.search-result', els.searchResults)) {
    node.classList.remove('is-active');
    node.setAttribute('aria-selected', 'false');
  }
  activeResult = clamped;
  if (clamped < 0) {
    els.searchInput.removeAttribute('aria-activedescendant');
    return;
  }
  const node = $(`#search-option-${clamped}`, els.searchResults);
  if (!node) return;
  node.classList.add('is-active');
  node.setAttribute('aria-selected', 'true');
  els.searchInput.setAttribute('aria-activedescendant', node.id);
  node.scrollIntoView({ block: 'nearest' });
}

function activateResult(index) {
  const result = searchResults[index];
  if (!result) return;
  els.searchDialog.close();
  if (location.hash === result.href) route();
  else location.hash = result.href;
}

/* --------------------------------------------------------------------------
   Events
   -------------------------------------------------------------------------- */

function bindStaticEvents() {
  els.searchBtn.addEventListener('click', openSearch);
  els.heroSearch.addEventListener('click', openSearch);
  els.settingsBtn.addEventListener('click', openSettings);
  els.menuBtn.addEventListener('click', openDrawer);

  for (const trigger of [els.searchBtn, els.heroSearch]) {
    trigger.addEventListener('pointerenter', () => ensurePagefind().catch(() => {}), { once: true });
  }

  for (const button of $$('[data-close]')) {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.close);
      if (dialog?.open) dialog.close();
    });
  }

  for (const dialog of [els.searchDialog, els.settingsDialog, els.drawer]) {
    enableLightDismiss(dialog);
  }

  els.drawer.addEventListener('close', () => {
    els.menuBtn.setAttribute('aria-expanded', 'false');
  });

  els.drawer.addEventListener('click', (event) => {
    if (event.target.closest('a')) els.drawer.close();
  });

  els.settingsDialog.addEventListener('change', (event) => {
    if (event.target.name === 'theme') applyTheme(event.target.value);
  });

  els.searchInput.addEventListener('input', () => {
    searchQuery = els.searchInput.value.trim();
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => runSearch(searchQuery), 80);
  });

  els.searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!searchResults.length) return;
      setActiveResult(activeResult < searchResults.length - 1 ? activeResult + 1 : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!searchResults.length) return;
      setActiveResult(activeResult > 0 ? activeResult - 1 : -1);
    } else if (event.key === 'Enter') {
      if (!searchResults.length) return;
      event.preventDefault();
      activateResult(activeResult >= 0 ? activeResult : 0);
    }
  });

  els.searchResults.addEventListener('click', (event) => {
    const chip = event.target.closest('.search-chip');
    if (chip) {
      const query = chip.dataset.query || '';
      els.searchInput.value = query;
      searchQuery = query;
      runSearch(query);
      els.searchInput.focus();
      return;
    }
    const result = event.target.closest('.search-result');
    if (!result) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activateResult(Number(result.dataset.result));
  });

  els.frame.addEventListener('load', handleFrameLoad);

  window.addEventListener('hashchange', route);

  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === THEME_KEY) applyTheme(readTheme(), { persist: false });
  });

  wideLayout.addEventListener('change', (event) => {
    if (event.matches && els.drawer.open) els.drawer.close();
  });
}

init().catch((error) => {
  console.error(error);
  renderBootError(error);
});
