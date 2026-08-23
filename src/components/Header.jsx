import BrandLogo from './BrandLogo.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sc-header">
      <nav className="sc-header-panel" aria-label="Navigation principale">
        <a href="/" className="sc-brand" aria-label="Safecheck-Hub, accueil">
          <BrandLogo className="sc-brand-logo" theme={theme} />
        </a>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
