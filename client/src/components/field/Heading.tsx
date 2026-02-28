type Props = {
  title: string
}

export function Heading({ title }: Props) {
  return (
    <div className="mb-7">
      <h2 className="font-display text-3xl text-slate-100 leading-tight mb-1.5">{title}</h2>
    </div>
  )
}
