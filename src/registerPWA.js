export function registerPWA() {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Registration can fail on localhost http in some browsers; ignore.
    })
  })
}
