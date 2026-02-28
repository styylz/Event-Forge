import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useEvent } from '../contexts/EventContext'
import { Logo } from '../components/common'
import { Countdown } from '../features/event-success/components/Countdown'

export function SuccessPage() {
  const { eventData, reset } = useEvent()
  const navigate = useNavigate()

  useEffect(() => {
    if (!eventData) {
      navigate('/form', { replace: true })
    }
  }, [eventData, navigate])

  if (!eventData) return null

  const formattedDate = new Date(eventData.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleReset = () => {
    reset()
    navigate('/form')
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#070a12] bg-[radial-gradient(ellipse_100%_55%_at_50%_-5%,rgba(74,222,128,.06)_0%,transparent_65%)]">
      <div className="flex-1" />
      <Logo />
      <div className="h-6" />
      <div className="flex flex-col z-10 w-full max-w-lg gap-8">
        <div className="anim-scale-in text-center">
          <h1 className="font-display text-4xl text-slate-100 mt-4 mb-2">You're all set!</h1>
          <p className="text-sm text-slate-400">Your event ticket is ready below.</p>
        </div>
        <div
          className="anim-scale-in rounded-2xl overflow-hidden bg-[#0d1117] border border-[#1a2230] shadow-[0_32px_80px_rgba(0,0,0,.55),0_0_0_1px_rgba(255,255,255,.025)]"
          style={{ animationDelay: '80ms' }}
        >
          <p className="mb-4 text-center rounded-full text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/[.09] border border-green-400/[.22]">
            ✓ Registration Confirmed
          </p>
          <div className="px-9 pt-[26px] pb-[22px]">
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
          <div className="px-9 py-[22px]">
            <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
              ◉ Countdown to Event Day
            </p>
            <Countdown dateStr={eventData.date} />
          </div>
        </div>
        <button
          onClick={handleReset}
          className="anim-scale-in h-12 w-full mt-5 rounded-xl text-sm font-semibold text-slate-500 border-[1.5px] border-[#1a2230]  hover:text-slate-100"
        >
          ← Forge Another Event
        </button>
      </div>
      <div className="flex-[2]" />
    </div>
  )
}
