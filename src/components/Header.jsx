import BrandLogo from './BrandLogo.jsx'
import Clock from './Clock.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ theme, ready, onToggleTheme }) {
  return (
    <header className="sc-header sc-anim">
      <nav className="sc-header-bar" aria-label="Navigation principale">
        <a href="/" className="sc-brand" aria-label="Safecheck-Hub, accueil">
          <BrandLogo className="sc-brand-logo" theme={theme} />
        </a>
        <div className="sc-header-actions">
          <Clock ready={ready} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>
    </header>
  )
}
