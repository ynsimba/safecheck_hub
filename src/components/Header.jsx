import OdooLogo from './OdooLogo.jsx'

export default function Header() {
  return (
    <header className="odoo-header">
      <nav className="container odoo-nav">
        <a href="#top" className="odoo-logo-link" aria-label="Safecheck-RDC accueil">
          <OdooLogo />
        </a>
      </nav>
    </header>
  )
}
