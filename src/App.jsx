import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import AnnouncementBanner from './components/AnnouncementBanner.jsx'
import AppGrid from './components/AppGrid.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import Footer from './components/Footer.jsx'
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

  return (
    <div className="odoo-page" id="top">
      {booting ? <SplashScreen fading={fading} /> : null}

      <div className="odoo-top">
        <Header />
      </div>

      <main className="odoo-hero" id="contenu">
        <div className="odoo-curve" aria-hidden="true" />
        <div className="odoo-orbs" aria-hidden="true">
          <span className="odoo-orb odoo-orb-1" />
          <span className="odoo-orb odoo-orb-2" />
          <span className="odoo-orb odoo-orb-3" />
        </div>
        <div className="container odoo-hero-inner">
          <div className="text-center">
            <AnnouncementBanner />
          </div>
          <AppGrid />
        </div>
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  )
}
