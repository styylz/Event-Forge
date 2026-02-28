import { CheckCircle } from '../../../components/atoms'
import { Field } from '../../../components/field/Field'
import { Heading } from '../../../components/field/Heading'
import type { UseFormRegister } from 'react-hook-form'
import type { EventFormData } from '../schemas'

type Props = {
  error?: string
  valid: boolean
  register: UseFormRegister<EventFormData>
}

export function DateField({ error, valid, register }: Props) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="anim-slide-up space-y-5">
      <Heading title="When does it start?" />
      <Field label="Event Date" error={error}>
        <div className="relative">
          <input
            type="date"
            min={today}
            {...register('date')}
            className={`inp ${error ? 'state-error' : valid ? 'state-valid' : 'state-neutral'}`}
            style={{
              colorScheme: 'dark',
              paddingRight: valid ? 40 : 16,
            }}
          />
          {valid && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <CheckCircle />
            </span>
          )}
        </div>
      </Field>
    </div>
  )
}
