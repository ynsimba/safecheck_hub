import { useEffect, useState } from 'react'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const weekdayFormat = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' })
const dayFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })
const fullFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' })

const pad = (value) => String(value).padStart(2, '0')

// A vertical strip 0–9 that slides to the current digit, like an odometer.
function Digit({ value, index }) {
  return (
    <span className="sc-digit" style={{ '--d': value, '--di': index }}>
      <span className="sc-digit-strip">
        {DIGITS.map((digit) => (
          <span key={digit}>{digit}</span>
        ))}
      </span>
    </span>
  )
}

function Roller({ text, offset = 0 }) {
  return text.split('').map((char, i) => <Digit key={i} value={Number(char)} index={offset + i} />)
}

// Letters cascade in whenever the text changes (new day or first reveal).
function Cascade({ text, className }) {
  return (
    <span className={className} key={text}>
      {Array.from(text).map((char, i) => (
        <span key={i} style={{ '--ci': i }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default function Clock({ ready = true }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let id
    // Tick on the second boundary so the ring and the digits stay in sync.
    const tick = () => {
      setNow(new Date())
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    }
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    return () => window.clearTimeout(id)
  }, [])

  const hours = ready ? pad(now.getHours()) : '00'
  const minutes = ready ? pad(now.getMinutes()) : '00'
  const seconds = now.getSeconds()
  const daytime = now.getHours() >= 6 && now.getHours() < 19

  return (
    <time
      className={`sc-clock${ready ? ' is-live' : ''}`}
      dateTime={now.toISOString()}
      aria-label={fullFormat.format(now)}
    >
      <span className="sc-clock-ring" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle className="sc-clock-ring-track" cx="12" cy="12" r="10" pathLength="60" />
          <circle
            className={`sc-clock-ring-fill${seconds === 0 ? ' is-reset' : ''}`}
            cx="12"
            cy="12"
            r="10"
            pathLength="60"
            style={{ strokeDashoffset: 60 - seconds }}
          />
        </svg>
        <i className={`bi ${daytime ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} key={String(daytime)} />
      </span>

      <span className="sc-clock-time" aria-hidden="true">
        <Roller text={hours} />
        <span className="sc-clock-colon">:</span>
        <Roller text={minutes} offset={2} />
        <span className="sc-clock-seconds">
          <Roller text={pad(seconds)} offset={4} />
        </span>
      </span>

      <span className="sc-clock-sep" aria-hidden="true" />

      {ready ? (
        <span className="sc-clock-date" aria-hidden="true">
          <Cascade className="sc-clock-weekday" text={weekdayFormat.format(now)} />
          <Cascade className="sc-clock-day" text={dayFormat.format(now)} />
        </span>
      ) : null}

      <span className="sc-clock-flash" key={minutes} aria-hidden="true" />
    </time>
  )
}
