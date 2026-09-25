import Reveal from './Reveal'

interface Props {
  kicker: string
  title: string
  sub?: string
}

export default function SectionHeader({ kicker, title, sub }: Props) {
  return (
    <Reveal className="sec-head">
      <p className="mono sec-kicker">{kicker}</p>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </Reveal>
  )
}
