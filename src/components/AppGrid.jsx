const APPS = [
  { name: 'Safecheck-App', icon: '/ICONE.png', href: 'https://www.safecheckrdc.com' },
  { name: 'SafeMed', icon: '/icon.png', href: 'https://www.safecheck-med.com' },
  { name: 'SafePay', icon: '/pay.png' },
  { name: 'RH', icon: '/RH.png' },
  { name: 'Commercial', icon: '/ccc.png' },
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
      <div className="odoo-app-grid">
        {APPS.map(({ name, icon, href }, index) => {
          const external = Boolean(href)
          return (
            <a
              href={href ?? `#app-${name}`}
              className="odoo-app"
              key={icon}
              style={{ '--i': index }}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <span className="odoo-app-tile">
                <span className="odoo-app-tile-glow" aria-hidden="true" />
                <img src={icon} alt={`Icône ${name}`} width="56" height="56" loading="lazy" />
              </span>
              <span className="odoo-app-label">{name}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
