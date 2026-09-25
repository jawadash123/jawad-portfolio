import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navSections, site } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'
import { useIsMobile } from '../hooks/useMedia'
import MagneticButton from './ui/MagneticButton'

const sectionIds = navSections.map((s) => s.id)

export default function Navbar() {
  const scrolled = useScrolled(30)
  const active = useActiveSection(sectionIds)
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <>
      <header className="nav" data-scrolled={scrolled}>
        <div className="container nav-inner">
          <a href="#home" className="nav-logo" data-scroll-to="home" aria-label={`${site.name} — home`}>
            <span className="nav-logo-mark">{site.monogram}</span>
            <span>
              JAWAD<span style={{ color: 'var(--accent-2)' }}>.dev</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="nav-link"
                data-scroll-to={s.id}
                data-active={active === s.id}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <MagneticButton variant="primary" className="nav-cta" data-scroll-to="contact">
            Let’s Talk
          </MagneticButton>

          <button
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navSections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                data-scroll-to={s.id}
                data-active={active === s.id}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {s.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2.4rem' }}
            >
              <MagneticButton variant="primary" data-scroll-to="contact" onClick={() => setOpen(false)}>
                Let’s Talk
              </MagneticButton>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
