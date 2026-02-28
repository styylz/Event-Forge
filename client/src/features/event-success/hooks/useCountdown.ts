import { useState, useEffect, useRef } from 'react'

export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds'
export type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  changed: Record<TimeUnit, boolean>
  expired: boolean
}

const MS = { day: 86_400_000, hour: 3_600_000, minute: 60_000, second: 1_000 } as const

function calcUnits(diff: number): Pick<Countdown, TimeUnit> {
  return {
    days: Math.floor(diff / MS.day),
    hours: Math.floor((diff % MS.day) / MS.hour),
    minutes: Math.floor((diff % MS.hour) / MS.minute),
    seconds: Math.floor((diff % MS.minute) / MS.second),
  }
}

const EXPIRED: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  changed: { days: false, hours: false, minutes: false, seconds: false },
  expired: true,
}

export function useCountdown(dateStr: string | null) {
  const [countdown, setCountdown] = useState<Countdown | null>(null)
  const prevUnits = useRef<Pick<Countdown, TimeUnit> | null>(null)

  useEffect(() => {
    if (!dateStr) return

    const tick = () => {
      const diff = new Date(`${dateStr}T00:00:00`).getTime() - Date.now()

      if (diff <= 0) {
        setCountdown(EXPIRED)
        return
      }

      const next = calcUnits(diff)
      const prev = prevUnits.current

      const changed = (Object.keys(next) as TimeUnit[]).reduce(
        (acc, key) => ({ ...acc, [key]: prev?.[key] !== next[key] }),
        {} as Record<TimeUnit, boolean>,
      )

      prevUnits.current = next
      setCountdown({ ...next, changed, expired: false })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [dateStr])

  return countdown
}
