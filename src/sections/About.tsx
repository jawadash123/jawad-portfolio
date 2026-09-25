import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { site } from '../data/site'

const focusTags = [
  'Python',
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'FastAPI',
  'Next.js',
  'PostgreSQL',
  'RAG',
  'YOLO',
  'OpenCV',
  'TensorFlow',
  'PyTorch',
  'Docker',
  'Linux',
]

const highlights = [
  {
    idx: '01',
    title: 'Intelligent systems, end to end',
    body: 'From data pipelines and model training to APIs and production UI — I own the full path from raw input to shipped feature.',
  },
  {
    idx: '02',
    title: 'Computer vision in production contexts',
    body: 'Detection, tracking and OCR pipelines with YOLO, OpenCV and ByteTrack — including a live AI DRS built on broadcast footage.',
  },
  {
    idx: '03',
    title: 'Full-stack AI products',
    body: 'Aegis, my multi-tenant SaaS platform, combines FastAPI, RAG, PostgreSQL, Next.js and Docker into one deployable system.',
  },
]

export default function About() {
  return (
    <section id="about" className="section container" aria-label="About me">
      <SectionHeader kicker="About" title="Engineering intelligence into software" />

      <div className="about-grid">
        <Reveal>
          <p className="about-lead">
            I’m <strong>{site.name}</strong> — a software engineer focused on{' '}
            <span className="grad-text" style={{ fontWeight: 600 }}>
              AI, machine learning, computer vision
            </span>{' '}
            and full-stack AI applications, based in {site.location}.
          </p>
          <p className="about-copy">
            My work spans the whole AI product surface: training and evaluating models, building the
            APIs that serve them, and shipping the web applications that make them useful. I care
            about systems that hold up outside the demo — multi-tenant architecture, honest metrics,
            and deployments that don’t fall over.
          </p>
          <p className="about-copy">
            Recently that has meant building a RAG-powered support platform, and developing a
            low-cost AI Decision Review System for local cricket — ball detection, tracking and
            trajectory prediction running on real broadcast footage.
          </p>

          <div className="about-focus">
            <h3>Core toolbox</h3>
            <div className="about-tags">
              {focusTags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="about-stack">
          {highlights.map((h, i) => (
            <Reveal key={h.idx} delay={i * 0.1}>
              <article className="surface stack-card">
                <div className="row">
                  <h3>{h.title}</h3>
                  <span className="idx">{h.idx}</span>
                </div>
                <p>{h.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
