import { APPS } from '../apps.js'

const live = APPS.filter((app) => app.href).length

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="sc-footer sc-anim">
      <p className="sc-footer-copy">© {year} Safecheck-RDC — Tous droits réservés</p>
      <p className="sc-footer-status">
        <span className="sc-status-dot" aria-hidden="true" />
        {live} applications en ligne · {APPS.length - live} à venir
      </p>
    </footer>
  )
}
