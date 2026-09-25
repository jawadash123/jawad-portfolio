import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Icon from '../components/ui/Icon'
import Lazy3D from '../components/three/Lazy3D'
import { projects, type Project } from '../data/projects'
import { usePrefersReducedMotion } from '../hooks/useMedia'

const ProjectVisualCanvas = lazy(() => import('../components/three/ProjectVisuals'))

/** Decorative detection/OCR-style labels layered over each 3D visual. */
const OVERLAYS: Record<Project['visual'], { text: string; style: React.CSSProperties }[]> = {
  aegis: [
    { text: 'META API · IN', style: { top: '16%', left: '12%' } },
    { text: 'RAG · RETRIEVE', style: { top: '20%', right: '14%' } },
    { text: 'MULTI-TENANT', style: { bottom: '18%', right: '18%' } },
  ],
  drs: [
    { text: 'BALL 0.97', style: { top: '30%', right: '20%' } },
    { text: 'BYTETRACK', style: { top: '52%', left: '16%' } },
    { text: 'PREDICTED PATH', style: { bottom: '22%', right: '12%' } },
  ],
  plate: [
    { text: 'VEHICLE', style: { top: '26%', left: '14%' } },
    { text: 'PLATE', style: { bottom: '34%', right: '22%' } },
    { text: 'OCR · EASYOCR', style: { bottom: '16%', left: '18%' } },
  ],
  emotion: [
    { text: 'FACE ROI', style: { top: '22%', left: '14%' } },
    { text: 'CNN · 7 CLASSES', style: { top: '30%', right: '12%' } },
    { text: 'REAL-TIME', style: { bottom: '18%', left: '20%' } },
  ],
  bot: [
    { text: 'FIRESTORE', style: { top: '18%', left: '14%' } },
    { text: 'TRIGGER RULES', style: { top: '26%', right: '14%' } },
  ],
}

const BOT_CHIPS = [
  { k: 'STORE', v: 'Firestore' },
  { k: 'TRIGGER', v: 'Time rules' },
  { k: 'NOTIFY', v: 'Admin SDK' },
]

function ProjectCard({ project, flip, onOpen }: { project: Project; flip: boolean; onOpen: () => void }) {
  const reduced = usePrefersReducedMotion()
  return (
    <Reveal>
      <button
        className="project-card"
        data-flip={flip}
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.title} — ${project.short}`}
      >
        <div className="project-visual">
          <Lazy3D fallback={<div className="project-visual-fallback" />}>
            {({ active }) => (
              <Suspense fallback={<div className="project-visual-fallback" />}>
                <ProjectVisualCanvas visual={project.visual} active={active} reduced={reduced} />
              </Suspense>
            )}
          </Lazy3D>
          <div className="cv-overlay" aria-hidden="true">
            {OVERLAYS[project.visual].map((o) => (
              <span key={o.text} className="cv-tag" style={o.style}>
                {o.text}
              </span>
            ))}
          </div>
        </div>

        <div className="project-info">
          <div className="project-top">
            <span className="project-index">{project.index}</span>
            {project.status && (
              <span className="project-status">
                <span className="dot" aria-hidden="true" />
                {project.status}
              </span>
            )}
            <span className="chip project-badge">{project.badge}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
          <div className="project-meta">
            {project.technologies.slice(0, 6).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="chip">+{project.technologies.length - 6}</span>
            )}
          </div>
          <span className="project-more">
            View case study <Icon name="arrow" size={13} />
          </span>
        </div>
      </button>
    </Reveal>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 42, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close case study" autoFocus>
          <Icon name="close" size={16} />
        </button>

        <div className="modal-banner" aria-hidden="true">
          <Lazy3D fallback={<div className="project-visual-fallback" />}>
            {({ active }) => (
              <Suspense fallback={<div className="project-visual-fallback" />}>
                <ProjectVisualCanvas visual={project.visual} active={active} reduced={reduced} />
              </Suspense>
            )}
          </Lazy3D>
          <div className="cv-overlay">
            {OVERLAYS[project.visual].map((o) => (
              <span key={o.text} className="cv-tag" style={o.style}>
                {o.text}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-body">
          <div>
            <div className="project-top">
              <span className="project-index">{project.index}</span>
              {project.role && <span className="chip">{project.role}</span>}
              {project.status && (
                <span className="project-status">
                  <span className="dot" aria-hidden="true" />
                  {project.status}
                </span>
              )}
              <span className="chip project-badge">{project.badge}</span>
            </div>
            <h2 id={`modal-${project.id}`}>{project.title}</h2>
            <p className="sub">
              {project.short}
              {project.timeline ? ` · ${project.timeline}` : project.date ? ` · ${project.date}` : ''}
            </p>
          </div>

          <div className="modal-block">
            <h3>Overview</h3>
            <p>{project.overview}</p>
          </div>

          <div className="modal-cols">
            <div className="modal-block">
              <h3>Problem</h3>
              <p>{project.problem}</p>
            </div>
            <div className="modal-block">
              <h3>Solution</h3>
              <p>{project.solution}</p>
            </div>
          </div>

          <div className="modal-block">
            <h3>Technical architecture</h3>
            <ol className="arch">
              {project.architecture.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>

          <div className="modal-block">
            <h3>Key features</h3>
            <ul className="feat">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {project.metrics && (
            <div className="modal-metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <div className="val">{m.value}</div>
                  <div className="lab">{m.label}</div>
                  {m.note && <div className="note">{m.note}</div>}
                </div>
              ))}
            </div>
          )}

          {project.disclaimer && <p className="modal-disclaimer">{project.disclaimer}</p>}

          {project.id === 'bot' && (
            <div className="bot-flow" style={{ position: 'static', padding: '0.4rem 0' }}>
              <div className="bot-chip-row">
                {BOT_CHIPS.map((c) => (
                  <span key={c.k} className="bot-chip">
                    <b>{c.k}</b> · {c.v}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-block">
            <h3>Technologies</h3>
            <div className="about-tags">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            {project.github && (
              <a className="btn" href={project.github} target="_blank" rel="noreferrer noopener">
                <Icon name="github" size={15} /> GitHub
              </a>
            )}
            {project.demo && (
              <a className="btn" href={project.demo} target="_blank" rel="noreferrer noopener">
                <Icon name="external" size={15} /> Live demo
              </a>
            )}
            {!project.github && !project.demo && (
              <span className="sub" style={{ fontSize: '0.8rem' }}>
                Repository link available on request.
              </span>
            )}
            <span className="spacer" />
            <button className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="section container" aria-label="Projects">
      <SectionHeader
        kicker="Selected work"
        title="Projects that build themselves into products"
        sub="Each project is a small case study — click any card for the problem, architecture and results."
      />

      <div className="projects-list">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} flip={i % 2 === 1} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  )
}
