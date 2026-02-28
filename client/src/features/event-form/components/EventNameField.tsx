import { CheckCircle } from '../../../components/atoms'
import type { UseFormRegister } from 'react-hook-form'
import type { EventFormData } from '../schemas'
import { Field } from './Field'
import { Heading } from './Heading'

type Props = {
  value: string
  error?: string
  valid: boolean
  register: UseFormRegister<EventFormData>
}

export function EventNameField({ value, error, valid, register }: Props) {
  return (
    <div className="anim-slide-up space-y-4">
      <Heading title="What's the occasion?" />
      <Field label="Event Name" hint={`${value.length}/80`} error={error}>
        <div className="relative group">
          <input
            type="text"
            maxLength={80}
            placeholder="e.g. Annual Product Summit 2026"
            autoFocus
            {...register('eventName')}
            className={`inp h-12 w-full text-base transition-all ${
              error ? 'state-error' : valid ? 'state-valid' : 'state-neutral'
            }`}
            style={{ paddingRight: valid ? 44 : 16 }}
          />
          {valid && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none anim-scale-in">
              <CheckCircle />
            </span>
          )}
        </div>
      </Field>
    </div>
  )
}
