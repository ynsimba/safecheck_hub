import { useEffect, useState } from 'react'

function greetingForHour(hour) {
  if (hour >= 5 && hour < 12) return 'Bonjour'
  if (hour >= 12 && hour < 18) return 'Bon après-midi'
  if (hour >= 18 && hour < 22) return 'Bonsoir'
  return 'Bonne nuit'
}

function currentGreeting() {
  return greetingForHour(new Date().getHours())
}

export default function AnnouncementBanner() {
  const [greeting, setGreeting] = useState(currentGreeting)

  useEffect(() => {
    const refresh = () => setGreeting(currentGreeting())
    const id = window.setInterval(refresh, 60_000)

    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)

    return () => {
      window.clearInterval(id)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  return (
    <div className="sc-intro">
      <p className="sc-eyebrow sc-anim">
        <span className="sc-eyebrow-badge" aria-hidden="true">
          <i className="bi bi-shield-fill-check" />
        </span>
        <span className="sc-eyebrow-text">
          Écosystème <strong>Safecheck</strong>
        </span>
        <span className="sc-eyebrow-tag">RDC</span>
      </p>
      <h1 className="sc-heading sc-anim">
        {greeting}. Choisissez votre <span className="sc-heading-accent">application</span>.
      </h1>
      <p className="sc-subheading sc-anim">
        Un accès unique à tous les outils de votre organisation.
      </p>
    </div>
  )
}
