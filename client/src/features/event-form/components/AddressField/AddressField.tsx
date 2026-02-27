import { Heading } from '../../../../components/fields/Heading'
import { Field } from '../../../../components/fields/Field'
import { AddressAutocomplete } from './AddressAutocomplete'
import type { UseFormRegister, UseFormTrigger, UseFormSetValue } from 'react-hook-form'
import type { EventFormData } from '../../schemas'

type Props = {
  register: UseFormRegister<EventFormData>
  error?: string
  isValid: boolean
  trigger: UseFormTrigger<EventFormData>
  setValue: UseFormSetValue<EventFormData>
}

export function AddressField({ register, error, isValid, trigger, setValue }: Props) {
  register('address')

  const handleSelect = (address: string) => {
    setValue('address', address)
    trigger('address')
  }

  return (
    <div className="anim-slide-up space-y-5">
      <Heading title="Where is it happening?" />
      <Field label="Venue Address" error={error}>
        <AddressAutocomplete onChange={handleSelect} hasError={!!error} isValid={isValid} />
      </Field>
    </div>
  )
}
