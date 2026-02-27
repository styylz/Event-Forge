import { createContext, useContext, useState, type ReactNode } from 'react'
import type { EventFormData } from '../features/event-form/schemas'

type EventContextType = {
  eventData: EventFormData | null
  submitEvent: (data: EventFormData) => void
  reset: () => void
}

export const EventContext = createContext<EventContextType | null>(null)

export function EventContextProvider({ children }: { children: ReactNode }) {
  const [eventData, setEventData] = useState<EventFormData | null>(null)

  const value: EventContextType = {
    eventData,
    submitEvent: (data) => setEventData(data),
    reset: () => setEventData(null),
  }

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

export const useEvent = () => {
  const context = useContext(EventContext)

  if (!context) {
    throw new Error('useEvent must be used within EventContextProvider')
  }

  return context
}
