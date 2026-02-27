import { z } from 'zod'

export const eventFormSchema = z.object({
  eventName: z
    .string()
    .min(1, 'Event name is required')
    .min(3, 'Must be at least 3 characters')
    .max(80, 'Maximum 80 characters')
    .transform((v) => v.trim()),
  address: z.string().min(1, 'Select a venue from the dropdown — typing alone is not enough'),
  date: z
    .string()
    .min(1, 'Please choose a date')
    .refine((v) => {
      const d = new Date(v + 'T00:00:00')
      return !isNaN(d.getTime())
    }, 'Invalid date')
    .refine((v) => {
      const d = new Date(v + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return d > today
    }, 'Date must be in the future'),
})

export type EventFormData = z.infer<typeof eventFormSchema>
