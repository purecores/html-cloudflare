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
