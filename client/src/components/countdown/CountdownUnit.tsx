type Props = {
  label: string
  value: number
  changed?: boolean
}

export const CountdownUnit = ({ label, value, changed }: Props) => {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div
        className="w-full rounded-xl py-3 px-2 text-center"
        style={{
          background: 'rgba(245,158,11,.08)',
          border: '1px solid rgba(245,158,11,.2)',
          perspective: '200px',
        }}
      >
        <span
          key={`${label}-${display}`}
          className={`font-mono-num block text-3xl font-semibold leading-none text-amber-400 ${
            changed ? 'anim-flip' : ''
          }`}
        >
          {display}
        </span>
      </div>
      <span className="text-xs font-bold tracking-widest uppercase text-slate-600">{label}</span>
    </div>
  )
}
