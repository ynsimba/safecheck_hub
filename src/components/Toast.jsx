export default function Toast({ toast }) {
  return (
    <div className="sc-toast-region" role="status" aria-live="polite">
      {toast ? (
        <div className={`sc-toast${toast.leaving ? ' is-leaving' : ''}`} key={toast.id}>
          <span className="sc-toast-icon" aria-hidden="true">
            <i className="bi bi-stars" />
          </span>
          <span>
            <strong>{toast.name}</strong> arrive bientôt dans l&apos;écosystème.
          </span>
        </div>
      ) : null}
    </div>
  )
}
