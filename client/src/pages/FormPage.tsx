import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEvent } from '../contexts/EventContext'
import { eventFormSchema, type EventFormData } from '../features/event-form/schemas'
import { Logo } from '../components/common'
import { Spinner } from '../components/atoms'
import { EventNameField } from '../features/event-form/components/EventNameField'
import { AddressField } from '../features/event-form/components/AddressField/AddressField'
import { DateField } from '../features/event-form/components/DateField'

export function FormPage() {
  const { submitEvent } = useEvent()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    mode: 'onChange',
    defaultValues: { eventName: '', address: '', date: '' },
  })

  const formData = watch()

  const isFieldValid = (fieldName: keyof EventFormData, value: string) =>
    !errors[fieldName] && value?.length > 0 && isDirty

  const onSubmit = async (data: EventFormData) => {
    setSubmitting(true)
    //Delay is used to mock API call on submit
    await new Promise((resolve) => setTimeout(resolve, 5000))
    submitEvent(data)
  }

  return (
    <div
      className="min-h-screen flex flex-col gap-4.5 items-center justify-center px-4 py-12"
      style={{
        background: '#070a12',
        backgroundImage:
          'radial-gradient(ellipse 100% 55% at 50% -5%, rgba(245,158,11,.07) 0%, transparent 65%)',
      }}
    >
      <Logo />
      <div className="relative z-10 w-full max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl"
          style={{
            background: '#0d1117',
            border: '1px solid #1a2230',
            padding: '36px 36px 28px',
            boxShadow: '0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.02)',
          }}
        >
          <div className="flex flex-col gap-8" style={{ minHeight: 280 }}>
            <EventNameField
              value={formData.eventName}
              error={errors.eventName?.message}
              valid={isFieldValid('eventName', formData.eventName)}
              register={register}
            />
            <div className="relative z-20">
              <AddressField
                register={register}
                error={errors.address?.message}
                isValid={isFieldValid('address', formData.address)}
                trigger={trigger}
                setValue={setValue}
              />
            </div>
            <DateField
              error={errors.date?.message}
              valid={isFieldValid('date', formData.date)}
              register={register}
            />
          </div>
          <div className="flex gap-3 mt-8 p-6">
            <button
              type="submit"
              disabled={submitting || !isValid}
              className="cta-btn flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5"
              style={{
                marginTop: '32px',
                padding: '8px',
                background:
                  submitting || !isValid
                    ? '#1a2230'
                    : 'linear-gradient(135deg, #f59e0b, #f97316, #ef4444)',
                color: submitting || !isValid ? '#475569' : '#fff',
                cursor: submitting || !isValid ? 'not-allowed' : 'pointer',
                boxShadow: submitting || !isValid ? 'none' : '0 4px 20px rgba(249,115,22,.3)',
              }}
            >
              {submitting ? (
                <>
                  <Spinner />
                  <span>Registering…</span>
                </>
              ) : (
                'Register Event 🎉'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
