import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import AnnouncementBanner from './components/AnnouncementBanner.jsx'
import AppGrid from './components/AppGrid.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import './App.css'

const SPLASH_MS = 2200
const FADE_MS = 450

export default function App() {
  const [booting, setBooting] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), SPLASH_MS)
    const hideTimer = window.setTimeout(() => setBooting(false), SPLASH_MS + FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (booting) {
    return <SplashScreen fading={fading} />
  }

  return (
    <div className="odoo-page" id="top">
      <div className="odoo-top">
        <Header />
      </div>

      <main className="odoo-hero">
        <div className="odoo-curve" aria-hidden="true" />
        <div className="container odoo-hero-inner">
          <div className="text-center">
            <AnnouncementBanner />
          </div>
          <AppGrid />
        </div>
      </main>
    </div>
  )
}
