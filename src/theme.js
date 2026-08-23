const STORAGE_KEY = 'sc-theme'

export function readTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'light'
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.content = theme === 'light' ? '#f3f6ee' : '#05070d'
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}
