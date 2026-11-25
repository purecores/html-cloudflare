/* Run before first paint so an explicit light/dark choice does not flash. */
try {
  const stored = localStorage.getItem('kb-theme');
  if (stored === 'light' || stored === 'dark') {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', stored);
    document.documentElement.style.colorScheme = stored;
  }
} catch {
  // Storage can be blocked; the site simply follows the system preference.
}

/* Apply hidden chrome before first paint so the layout does not flash. */
try {
  const chrome = JSON.parse(localStorage.getItem('kb-chrome') || '{}') || {};
  const root = document.documentElement;
  if (chrome.sidebar === false) root.classList.add('chrome-no-sidebar');
  if (chrome.topbar === false) root.classList.add('chrome-no-topbar');
  if (chrome.bottom === false) root.classList.add('chrome-no-bottom');
} catch {
  // Chrome preferences are optional.
}
