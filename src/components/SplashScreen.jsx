export default function SplashScreen({ fading }) {
  return (
    <div className={`splash${fading ? ' is-fading' : ''}`} role="status" aria-live="polite">
      <div className="splash-inner">
        <img className="splash-logo" src="/logo-1.png" alt="Safecheck-Hub" />
        <p className="splash-title">Safecheck-Hub</p>
        <p className="splash-subtitle">Chargement de l&apos;écosystème…</p>
        <div className="splash-track" aria-hidden="true">
          <span className="splash-bar" />
        </div>
      </div>
    </div>
  )
}
