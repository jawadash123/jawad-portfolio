import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/ui/MagneticButton'
import Icon from '../components/ui/Icon'
import PortraitCard from '../components/PortraitCard'
import { site } from '../data/site'
import { useMedia, usePrefersReducedMotion } from '../hooks/useMedia'
import Lazy3D from '../components/three/Lazy3D'

const NeuralCore = lazy(() => import('../components/three/NeuralCore'))
const LowPolyScene = lazy(() => import('../components/three/LowPolyScene'))

const roleParts = ['Software Engineer', 'AI · Machine Learning', 'Computer Vision']

const titleVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const fadeVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const mobile = useMedia('(max-width: 820px)')
  const weakDevice = useMedia('(max-width: 820px), (prefers-reduced-motion: reduce)')

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* 3D background — lazy-mounted, low-complexity on weak devices */}
      <div className="hero-canvas" aria-hidden="true">
        <Lazy3D fallback={<span />}>
          {({ active }) => (
            <Suspense fallback={<span />}>
              {weakDevice ? (
                <LowPolyScene active={active} reduced={reduced || mobile} />
              ) : (
                <NeuralCore active={active} reduced={reduced} mobile={mobile} />
              )}
            </Suspense>
          )}
        </Lazy3D>
      </div>
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-layout">
          <div className="hero-copy">
        <motion.p
          className="hero-status"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0.05}
        >
          <span className="dot" aria-hidden="true" />
          Available for opportunities — Lahore, Pakistan
        </motion.p>

        <h1>
          <span className="hero-title-line">
            <motion.span variants={titleVariants} initial="hidden" animate="visible" custom={0}>
              Muhammad
            </motion.span>
          </span>
          <span className="hero-title-line">
            <motion.span variants={titleVariants} initial="hidden" animate="visible" custom={1}>
              Jawad <span className="grad-text">Ali</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-role"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          {roleParts.map((part, i) => (
            <span key={part}>
              {i > 0 && <b aria-hidden="true"> · </b>}
              {part}
            </span>
          ))}
        </motion.p>

        <motion.p
          className="hero-intro"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0.62}
        >
          {site.intro}
        </motion.p>

        <motion.div
          className="hero-ctas"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0.74}
        >
          <MagneticButton variant="primary" data-scroll-to="projects">
            View Projects
          </MagneticButton>
          <MagneticButton href={site.resumePath} download="Muhammad-Jawad-Ali-Resume.pdf">
            <Icon name="download" size={15} />
            Download Resume
          </MagneticButton>
          <MagneticButton variant="ghost" data-scroll-to="contact">
            Contact Me
            <Icon name="arrow" size={15} />
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-meta"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0.88}
        >
          <div className="hero-meta-item">
            <span className="k">Focus</span>
            <span className="v">AI / ML · Computer Vision</span>
          </div>
          <div className="hero-meta-item">
            <span className="k">Stack</span>
            <span className="v">Python · FastAPI · Next.js</span>
          </div>
          <div className="hero-meta-item">
            <span className="k">Currently</span>
            <span className="v">BSCS ’26 · AI DRS Final Year Project</span>
          </div>
        </motion.div>
          </div>

          <PortraitCard />
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  )
}
