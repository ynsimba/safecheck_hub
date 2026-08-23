export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="odoo-footer">
      <p className="odoo-footer-copy">
        © {year} Safecheck-RDC. Tous droits réservés.
      </p>
    </footer>
  )
}
