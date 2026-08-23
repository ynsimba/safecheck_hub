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
    <div className="pwa-install" role="dialog" aria-label="Installer Safecheck-Hub">
      <p className="pwa-install-text">Installer Safecheck-Hub sur cet appareil</p>
      <div className="pwa-install-actions">
        <button type="button" className="pwa-install-dismiss" onClick={() => setVisible(false)}>
          Plus tard
        </button>
        <button type="button" className="pwa-install-accept" onClick={install}>
          Installer
        </button>
      </div>
    </div>
  )
}
