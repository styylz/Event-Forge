import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useEvent } from '../contexts/EventContext'
import { Logo } from '../components/common'
import { Countdown } from '../components/countdown'

export function SuccessPage() {
  const { eventData, reset } = useEvent()
  const navigate = useNavigate()

  useEffect(() => {
    if (!eventData) {
      navigate('/form', { replace: true })
    }
  }, [eventData, navigate])

  if (!eventData) return null

  const handleReset = () => {
    reset()
    navigate('/form')
  }

  const formattedDate = new Date(eventData.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: '#070a12',
        backgroundImage:
          'radial-gradient(ellipse 100% 55% at 50% -5%, rgba(74,222,128,.06) 0%, transparent 65%)',
      }}
    >
      <div className="flex-1" />
      <Logo />
      <div className="h-6" />
      <div className="flex flex-col z-10 w-full max-w-lg gap-8">
        <div className="anim-scale-in text-center flex flex-col gap-1.5">
          <h1 className="font-display text-4xl text-slate-100 mt-4 mb-2">You're all set!</h1>
          <p className="text-sm text-slate-400">Your event ticket is ready below.</p>
        </div>
        <div
          className="anim-scale-in rounded-2xl overflow-hidden"
          style={{
            background: '#0d1117',
            border: '1px solid #1a2230',
            animationDelay: '80ms',
            boxShadow: '0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.025)',
          }}
        >
          <p
            className="mb-4 text-center  rounded-full text-xs font-bold tracking-widest uppercase text-green-400"
            style={{
              background: 'rgba(74,222,128,.09)',
              border: '1px solid rgba(74,222,128,.22)',
            }}
          >
            ✓ Registration Confirmed
          </p>

          <div style={{ padding: '26px 36px 22px' }}>
            <p className="text-xs font-bold tracking-widest text-slate-600 uppercase mb-1.5">
              Event
            </p>
            <h2 className="text-xl font-bold text-slate-100 leading-snug mb-6">
              {eventData.eventName}
            </h2>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-600 uppercase mb-1.5">
                  📅 Date
                </p>
                <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                  {formattedDate}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-600 uppercase mb-1.5">
                  📍 Venue
                </p>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  {eventData.address}
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '22px 36px' }}>
            <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
              ◉ Countdown to Event Day
            </p>
            <Countdown dateStr={eventData.date} />
          </div>
        </div>
        <button
          onClick={handleReset}
          className="ghost-btn h-10 w-full mt-5 rounded-xl text-sm font-semibold text-slate-500 transition-all"
          style={{ border: '1.5px solid #1a2230' }}
        >
          ← Register Another Event
        </button>
      </div>
      <div className="flex-2" />
    </div>
  )
}
