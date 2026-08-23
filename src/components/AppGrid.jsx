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
    <section className="odoo-apps" aria-labelledby="apps-heading">
      <h2 id="apps-heading" className="visually-hidden">
        Applications de l&apos;écosystème Safecheck
      </h2>
      <div className="row g-3 g-md-4 odoo-app-grid justify-content-center">
        {APPS.map(({ name, icon, href }) => {
          const external = Boolean(href)
          return (
            <div className="col-3 odoo-app-col" key={icon}>
              <a
                href={href ?? `#app-${name}`}
                className="odoo-app"
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="odoo-app-tile">
                  <img src={icon} alt={`Icône ${name}`} width="56" height="56" />
                </span>
                <span className="odoo-app-label">{name}</span>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
