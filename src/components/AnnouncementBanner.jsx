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
      <p className="sc-eyebrow">Écosystème Safecheck RDC</p>
      <h1 className="sc-heading">
        {greeting}. Choisissez votre <span className="sc-heading-accent">application</span>.
      </h1>
    </div>
  )
}
