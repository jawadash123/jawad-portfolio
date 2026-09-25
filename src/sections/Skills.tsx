import { lazy, Suspense } from 'react'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Lazy3D from '../components/three/Lazy3D'
import { orbitRings, skillCategories } from '../data/skills'
import { usePrefersReducedMotion } from '../hooks/useMedia'

const TechOrbit = lazy(() => import('../components/three/TechOrbit'))

export default function Skills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="skills" className="section container" aria-label="Skills">
      <SectionHeader
        kicker="Capabilities"
        title="Technologies I work with"
        sub="Organized the way I actually use them — from models to deployment. No invented percentages; the projects above are the proof."
      />

      <div className="skills-orbit-wrap">
        <Reveal>
          <div className="orbit-stage" aria-hidden="true">
            <span className="orbit-ring" />
            <span className="orbit-ring" />
            <Lazy3D fallback={<span />}>
              {({ active }) => (
                <Suspense fallback={<span />}>
                  <TechOrbit items={orbitRings} active={active} reduced={reduced} />
                </Suspense>
              )}
            </Lazy3D>
            <div className="orbit-core">
              <div>
                <div className="core-k">AI Core</div>
                <div className="core-v">Full-Stack ML</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="skill-grid">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 3) * 0.08}>
            <article className="surface skill-card">
              <div className="head">
                <span className="num">{cat.icon}</span>
                <h3>{cat.label}</h3>
              </div>
              <ul>
                {cat.skills.map((s) => (
                  <li key={s}>
                    <span className="chip">{s}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
