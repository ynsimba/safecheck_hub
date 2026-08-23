export default function BrandLogo({ className = '', theme = 'light' }) {
  return (
    <img
      className={className}
      src={theme === 'dark' ? '/logo-2.png' : '/logo-1.png'}
      alt="Safecheck-Hub, écosystème Safecheck RDC"
    />
  )
}
