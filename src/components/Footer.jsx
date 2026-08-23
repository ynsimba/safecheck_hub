export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="sc-footer">
      <p className="sc-footer-copy">
        <span className="sc-footer-mark" aria-hidden="true" />
        {year} Safecheck-RDC — Tous droits réservés
      </p>
    </footer>
  )
}
