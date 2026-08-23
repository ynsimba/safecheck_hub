export default function SplashScreen({ fading, theme = 'light', duration = 1800 }) {
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
      </div>

      <div className="sc-splash-inner">
        <img
          className="sc-splash-logo"
          src={theme === 'dark' ? '/logo-2.png' : '/logo-1.png'}
          alt=""
        />
        <p className="sc-splash-boot">Chargement de l&apos;écosystème</p>
        <div className="sc-splash-track" aria-hidden="true">
          <span className="sc-splash-bar" />
        </div>
      </div>
    </div>
  )
}
