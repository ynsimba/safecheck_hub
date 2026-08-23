export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="sc-theme-toggle"
      onClick={onToggle}
      aria-label={isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
      title={isLight ? 'Mode sombre' : 'Mode clair'}
    >
      <i className={`bi ${isLight ? 'bi-moon-stars' : 'bi-sun'}`} aria-hidden="true" />
    </button>
  )
}
