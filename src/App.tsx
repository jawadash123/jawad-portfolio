import { useCallback, useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import HowIBuild from './sections/HowIBuild'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { navSections } from './data/site'

export default function App() {
  /** Smooth in-page anchor scrolling with reduced-motion awareness. */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }, [])

  // Delegate clicks on any [data-scroll-to] element.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-scroll-to]')
      if (!target) return
      e.preventDefault()
      scrollTo(target.dataset.scrollTo!)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [scrollTo])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <HowIBuild />
        <Education />
        <Contact />
      </main>
      <Footer />
      {/* keep navSections import used for type-level cohesion */}
      <span hidden aria-hidden data-nav-ids={navSections.map((s) => s.id).join(',')} />
    </>
  )
}
