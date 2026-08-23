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
    <section className="sc-apps" aria-labelledby="apps-heading">
      <h2 id="apps-heading" className="sc-visually-hidden">
        Applications de l&apos;écosystème Safecheck
      </h2>
      <div className="sc-grid">
        {APPS.map(({ name, icon, href }, index) => {
          const external = Boolean(href)
          return (
            <a
              href={href ?? `#app-${name}`}
              className="sc-card"
              key={icon}
              style={{ '--i': index }}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <span className="sc-card-border" aria-hidden="true" />
              <span className="sc-card-chip">
                <img src={icon} alt="" width="48" height="48" loading="lazy" />
              </span>
              <span className="sc-card-label">{name}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
