import { useEffect, useId, useRef, useState } from 'react'

const STORAGE_KEY = 'sc-octobre-rose-dismissed'
const IS_OCTOBER = () => new Date().getMonth() === 9

function RibbonIcon({ size = 28 }) {
  return (
    <img
      src="/octobre.png"
      alt=""
      width={size}
      height={size}
      decoding="async"
      draggable="false"
    />
  )
}

export default function OctobreRose() {
  const panelId = useId()
  const rootRef = useRef(null)
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!IS_OCTOBER()) return undefined
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return undefined
    } catch {
      /* private mode */
    }
    setActive(true)
    return undefined
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  if (!active) return null

  const dismiss = () => {
    setOpen(false)
    setActive(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode */
    }
  }

  return (
    <div className={`sc-rose${open ? ' is-open' : ''}`} ref={rootRef}>
      {open ? (
        <aside
          className="sc-rose-panel"
          id={panelId}
          role="dialog"
          aria-label="Octobre Rose"
        >
          <div className="sc-rose-panel-head">
            <span className="sc-rose-badge" aria-hidden="true">
              <RibbonIcon size={22} />
            </span>
            <div>
              <p className="sc-rose-kicker">Campagne Safecheck</p>
              <h2 className="sc-rose-title">Octobre Rose</h2>
            </div>
            <button
              type="button"
              className="sc-rose-close"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>
          <p className="sc-rose-copy">
            Sensibilisation au dépistage du cancer du sein. Parlez-en autour de vous —
            un geste simple peut sauver des vies.
          </p>
          <div className="sc-rose-actions">
            <button type="button" className="sc-rose-dismiss" onClick={dismiss}>
              Masquer
            </button>
            <button type="button" className="sc-rose-keep" onClick={() => setOpen(false)}>
              Continuer
            </button>
          </div>
        </aside>
      ) : null}

      <button
        type="button"
        className="sc-rose-fab"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Fermer Octobre Rose' : 'Octobre Rose — sensibilisation'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sc-rose-fab-glow" aria-hidden="true" />
        <span className="sc-rose-fab-icon" aria-hidden="true">
          <RibbonIcon size={34} />
        </span>
      </button>
    </div>
  )
}
