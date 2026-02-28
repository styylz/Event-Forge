import { useCountdown, type TimeUnit } from '../hooks/useCountdown'
import { CountdownUnit } from './CountdownUnit'

type Props = { dateStr: string | null }

const UNITS = [
  { label: 'Days', key: 'days' },
  { label: 'Hours', key: 'hours' },
  { label: 'Mins', key: 'minutes' },
  { label: 'Secs', key: 'seconds' },
] as const satisfies { label: string; key: TimeUnit }[]

export const Countdown = ({ dateStr }: Props) => {
  const tick = useCountdown(dateStr)

  if (!tick) return null

  if (tick.expired) return <p className="text-red-400 text-sm">This date has already passed.</p>

  return (
    <div className="flex gap-2">
      {UNITS.map(({ label, key }) => (
        <CountdownUnit key={key} label={label} value={tick[key]} changed={tick.changed[key]} />
      ))}
    </div>
  )
}
