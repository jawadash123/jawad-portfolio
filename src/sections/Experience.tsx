import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="section container" aria-label="Experience">
      <SectionHeader
        kicker="Experience"
        title="Where I’ve worked"
        sub="AI/ML engineering, full-stack internships and development roles — hover a role to see the details."
      />

      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.id} delay={i * 0.12}>
            <article className="tl-item" tabIndex={0}>
              <span className="tl-node" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="surface tl-card">
                <div className="tl-top">
                  <h3 className="tl-role">{job.role}</h3>
                  <span className="tl-org">@ {job.org}</span>
                  <span className="tl-period">
                    {job.period} · {job.duration}
                    {job.location && <span className="tl-loc"> · {job.location}</span>}
                  </span>
                </div>
                <p className="tl-summary">{job.summary}</p>
                <div className="tl-details">
                  <div>
                    <ul>
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="tl-tags">
                  {job.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
