const APPS = [
  { name: 'Safecheck-App', icon: '/ICONE.png', href: 'https://www.safecheckrdc.com' },
  { name: 'SafeMed', icon: '/icon.png', href: 'https://www.safecheck-med.com' },
  { name: 'SafePay', icon: '/pay.png' },
  { name: 'RH', icon: '/RH.png' },
  { name: 'Commercial', icon: '/icons/commercial.svg' },
  { name: 'Finances', icon: '/icons/finances.svg' },
  { name: 'Intendance', icon: '/icons/intendance.svg' },
  { name: 'Administration', icon: '/icons/administration.svg' },
]

export default function AppGrid() {
  return (
    <div className="row g-3 g-md-4 odoo-app-grid justify-content-center">
      {APPS.map(({ name, icon, href }) => (
        <div className="col-6 col-sm-3 odoo-app-col" key={icon}>
          <a href={href ?? `#app-${name}`} className="odoo-app">
            <span className="odoo-app-tile">
              <img src={icon} alt={name} width="56" height="56" />
            </span>
            <span className="odoo-app-label">{name}</span>
          </a>
        </div>
      ))}
    </div>
  )
}
