import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Icon from '../components/ui/Icon'
import { pipeline } from '../data/skills'

export default function HowIBuild() {
  return (
    <section id="how-i-build" className="section container" aria-label="How I build">
      <SectionHeader
        kicker="Process"
        title="How I build"
        sub="One pipeline from idea to production — the same stack running through every project above. Hover each stage."
      />

      <Reveal>
        <div className="pipeline">
          {pipeline.map((node, i) => (
            <div key={node.id} className="pipe-node" tabIndex={0}>
              {i < pipeline.length - 1 && (
                <span className="pipe-arrow" aria-hidden="true">
                  →
                </span>
              )}
              <span className="step">{String(i + 1).padStart(2, '0')}</span>
              <h3>{node.label}</h3>
              <span className="tech">{node.tech}</span>
              <div className="detail">
                <p>{node.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p
          style={{
            marginTop: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--ink-faint)',
            fontSize: '0.85rem',
          }}
        >
          <Icon name="chat" size={15} />
          The same discipline applies at every scale — a weekend tool or a multi-tenant platform.
        </p>
      </Reveal>
    </section>
  )
}
