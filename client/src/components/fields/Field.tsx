import type { ReactNode } from 'react'
import { ErrorDot } from '../atoms'

type Props = {
  label: string
  hint?: string
  error?: string | null
  children: ReactNode
  id?: string
}

export const Field = ({ label, hint, error, children, id }: Props) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-end px-4">
      <label
        htmlFor={id}
        className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-none"
      >
        {label}
      </label>
      {hint && <span className="text-[10px] font-medium text-slate-600  leading-none">{hint}</span>}
    </div>
    {children}
    <div
      className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        error ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className="flex items-center gap-1.5 text-red-400 text-xs font-medium pt-2 pb-1 px-1">
          <ErrorDot />
          <span className="leading-tight">{error}</span>
        </div>
      </div>
    </div>
  </div>
)
