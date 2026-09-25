import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { coursework, education } from '../data/experience'

export default function Education() {
  return (
    <section id="education" className="section container" aria-label="Education">
      <SectionHeader kicker="Education" title="Academic foundation" />

      <div className="edu-list">
        {education.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.1}>
            <article className="surface edu-item">
              <span className="edu-year">
                {e.year}
                {e.current ? <em style={{ display: 'block', fontSize: '0.6rem', color: '#fbbf24', fontStyle: 'normal' }}>IN PROGRESS</em> : null}
              </span>
              <div>
                <h3>{e.degree}</h3>
                <p className="inst">{e.institution}</p>
              </div>
              <div className="edu-result">
                <span className="val">{e.result}</span>
                <span className="lab">{e.resultLabel}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="edu-coursework">
        <h3>Relevant coursework</h3>
        <div className="about-tags">
          {coursework.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
