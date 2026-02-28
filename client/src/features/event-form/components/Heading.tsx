type Props = {
  title: string
}

export function Heading({ title }: Props) {
  return <h2 className="font-display text-3xl text-slate-100 leading-tight mb-1.5">{title}</h2>
}
