export default function SplashScreen({ fading, theme = 'light', duration = 1800 }) {
  const logo = theme === 'dark' ? '/logo-2.png' : '/logo-1.png'

  return (
    <div
      className={`sc-splash${fading ? ' is-fading' : ''}`}
      style={{ '--splash-ms': `${duration}ms` }}
      role="status"
      aria-live="polite"
      aria-label="Chargement de l'écosystème Safecheck"
    >
      <div className="sc-splash-bg" aria-hidden="true">
        <span className="sc-splash-orb sc-splash-orb-1" />
        <span className="sc-splash-orb sc-splash-orb-2" />
        <span className="sc-splash-grid" />
      </div>

      <div className="sc-splash-inner">
        <div className="sc-splash-logo-wrap" style={{ '--logo': `url(${logo})` }}>
          <img className="sc-splash-logo" src={logo} alt="" />
          <span className="sc-splash-shine" aria-hidden="true" />
        </div>
        <div className="sc-splash-track" aria-hidden="true">
          <span className="sc-splash-bar" />
        </div>
        <p className="sc-splash-boot">Chargement de l&apos;écosystème</p>
      </div>
    </div>
  )
}
