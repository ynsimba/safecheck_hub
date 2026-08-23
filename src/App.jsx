import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import AnnouncementBanner from './components/AnnouncementBanner.jsx'
import AppGrid from './components/AppGrid.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import Footer from './components/Footer.jsx'
import { applyTheme, readTheme } from './theme.js'
import './App.css'

const SPLASH_MS = 1800
const SPLASH_MS_REDUCED = 240
const FADE_MS = 420

export default function App() {
  const [booting, setBooting] = useState(true)
  const [fading, setFading] = useState(false)
  const [theme, setTheme] = useState(() => readTheme())
  const [splashMs] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? SPLASH_MS_REDUCED : SPLASH_MS,
  )
  const heroRef = useRef(null)

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

  return (
    <div className="sc-shell" id="top">
      {booting ? <SplashScreen fading={fading} theme={theme} duration={splashMs} /> : null}

      <Header
        theme={theme}
        onToggleTheme={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}
      />

      <main className="sc-hero" id="contenu" ref={heroRef}>
        <div className="sc-hero-bg" aria-hidden="true">
          <span className="sc-aurora sc-aurora-1" />
          <span className="sc-aurora sc-aurora-2" />
          <span className="sc-aurora sc-aurora-3" />
          <span className="sc-grid-overlay" />
          <span className="sc-spotlight" />
        </div>

        <div className="sc-hero-inner">
          <AnnouncementBanner />
          <AppGrid />
        </div>
      </main>

      <Footer />
      {booting ? null : <InstallPrompt />}
    </div>
  )
}
