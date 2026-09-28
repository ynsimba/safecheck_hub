import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true

    if (standalone) return undefined

    const onPrompt = (event) => {
      event.preventDefault()
      setDeferred(event)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (!visible || !deferred) return null

  const install = async () => {
    deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
    setVisible(false)
  }

  return (
    <div className="sc-install" role="dialog" aria-label="Installer Safecheck-Hub">
      <div className="sc-install-body">
        <span className="sc-install-icon" aria-hidden="true">
          <img src="/ICONE.png" alt="" width="22" height="22" />
        </span>
        <p className="sc-install-text">
          <strong>Installer Safecheck-Hub</strong>
          <span>Accès instantané depuis votre écran d&apos;accueil</span>
        </p>
      </div>
      <div className="sc-install-actions">
        <button type="button" className="sc-install-dismiss" onClick={() => setVisible(false)}>
          Plus tard
        </button>
        <button type="button" className="sc-install-accept" onClick={install}>
          <i className="bi bi-download" aria-hidden="true" /> Installer
        </button>
      </div>
    </div>
  )
}
