import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Header from './components/Header.jsx'
import AnnouncementBanner from './components/AnnouncementBanner.jsx'
import AppGrid from './components/AppGrid.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'
import { applyTheme, readTheme } from './theme.js'
import './App.css'

const SPLASH_MS = 1600
const SPLASH_MS_REDUCED = 240
const FADE_MS = 700
const TOAST_MS = 2600
const TOAST_EXIT_MS = 280

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [booting, setBooting] = useState(true)
  const [fading, setFading] = useState(false)
  const [theme, setTheme] = useState(() => readTheme())
  const [toast, setToast] = useState(null)
  const [splashMs] = useState(() => (prefersReducedMotion() ? SPLASH_MS_REDUCED : SPLASH_MS))
  const heroRef = useRef(null)
  const toastTimers = useRef([])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), splashMs)
    const hideTimer = window.setTimeout(() => setBooting(false), splashMs + FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [splashMs])

  useEffect(() => {
    const node = heroRef.current
    if (!node || !window.matchMedia('(hover: hover)').matches) return undefined

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    node.addEventListener('pointermove', onMove)
    return () => node.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => () => toastTimers.current.forEach(window.clearTimeout), [])

  const toggleTheme = useCallback(
    (event) => {
      const next = theme === 'light' ? 'dark' : 'light'

      if (!document.startViewTransition || prefersReducedMotion()) {
        setTheme(next)
        return
      }

      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next))
        applyTheme(next)
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [theme],
  )

  const showSoon = useCallback((name) => {
    toastTimers.current.forEach(window.clearTimeout)
    const id = Date.now()
    setToast({ id, name, leaving: false })
    toastTimers.current = [
      window.setTimeout(() => setToast((t) => (t?.id === id ? { ...t, leaving: true } : t)), TOAST_MS),
      window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), TOAST_MS + TOAST_EXIT_MS),
    ]
  }, [])

  return (
    <div className={`sc-shell${fading ? ' is-ready' : ''}`} id="top">
      {booting ? <SplashScreen fading={fading} theme={theme} duration={splashMs} /> : null}

      <div className="sc-backdrop" aria-hidden="true">
        <span className="sc-aurora sc-aurora-1" />
        <span className="sc-aurora sc-aurora-2" />
        <span className="sc-aurora sc-aurora-3" />
        <span className="sc-noise" />
      </div>

      <Header theme={theme} ready={fading} onToggleTheme={toggleTheme} />

      <main className="sc-hero" id="contenu" ref={heroRef}>
        <span className="sc-spotlight" aria-hidden="true" />
        <div className="sc-hero-inner">
          <AnnouncementBanner />
          <AppGrid onSoon={showSoon} />
        </div>
      </main>

      <Footer />
      <Toast toast={toast} />
      {booting ? null : <InstallPrompt />}
    </div>
  )
}
