import { useEffect, useRef } from 'react'
import { APPS } from '../apps.js'

const MAX_TILT = 7

export default function AppGrid({ onSoon }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    const canTilt =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!grid || !canTilt) return undefined

    const onMove = (event) => {
      const card = event.target.closest('.sc-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
      card.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT * 2}deg`)
      card.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT * 2}deg`)
    }

    const onLeave = (event) => {
      const card = event.target.closest?.('.sc-card')
      if (!card || card.contains(event.relatedTarget)) return
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    }

    grid.addEventListener('pointermove', onMove)
    grid.addEventListener('pointerout', onLeave)
    return () => {
      grid.removeEventListener('pointermove', onMove)
      grid.removeEventListener('pointerout', onLeave)
    }
  }, [])

  return (
    <section className="sc-apps" aria-labelledby="apps-heading">
      <h2 id="apps-heading" className="sc-visually-hidden">
        Applications de l&apos;écosystème Safecheck
      </h2>
      <ul className="sc-grid" ref={gridRef}>
        {APPS.map(({ name, icon, href, iconSize }, index) => {
          const live = Boolean(href)
          const content = (
            <>
              <span className="sc-card-glow" aria-hidden="true" />
              <span className="sc-card-chip">
                <img
                  src={icon}
                  alt=""
                  width="80"
                  height="80"
                  decoding="async"
                  className={iconSize === 'lg' ? 'is-lg' : undefined}
                />
              </span>
              <span className="sc-card-body">
                <span className="sc-card-label">{name}</span>
                <span className="sc-card-status">
                  <span className="sc-status-dot" aria-hidden="true" />
                  {live ? 'En ligne' : 'Bientôt'}
                </span>
              </span>
              <span className="sc-card-arrow" aria-hidden="true">
                <i className={`bi ${live ? 'bi-arrow-up-right' : 'bi-hourglass-split'}`} />
              </span>
            </>
          )

          return (
            <li key={name} className="sc-grid-item sc-anim" style={{ '--i': index }}>
              {live ? (
                <a
                  href={href}
                  className="sc-card"
                  data-status="live"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} — ouvrir dans un nouvel onglet`}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className="sc-card"
                  data-status="soon"
                  onClick={() => onSoon(name)}
                  aria-label={`${name} — bientôt disponible`}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
