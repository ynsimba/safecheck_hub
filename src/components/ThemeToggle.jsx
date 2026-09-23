export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="sc-theme-toggle"
      data-theme-state={theme}
      onClick={onToggle}
      aria-label={isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
      title={isLight ? 'Mode sombre' : 'Mode clair'}
    >
      <i className="bi bi-sun-fill sc-theme-sun" aria-hidden="true" />
      <i className="bi bi-moon-stars-fill sc-theme-moon" aria-hidden="true" />
    </button>
  )
}
