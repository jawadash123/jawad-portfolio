/**
 * Site-wide configuration — the single place to update contact details,
 * social URLs and the resume asset. Only resume-provided data lives here.
 */

export const site = {
  name: 'Muhammad Jawad Ali',
  monogram: 'JA',
  role: 'Computer Science',
  disciplines: ['AI', 'Machine Learning', 'Computer Vision'],
  location: 'Lahore, Pakistan',
  intro:
    'I build AI-powered applications — multi-tenant RAG support platforms, real-time cricket analytics with YOLO ball tracking, and computer-vision systems for plate and emotion detection — shipped full-stack with Python, FastAPI and Next.js.',
  email: 'jawadaliofficial.dev@gmail.com',
  phone: '+92 322 40 82 766',
  /**
   * Social links are intentionally configurable. The resume does not
   * provide profile URLs — set them here when available and the UI
   * (buttons, footer) picks them up automatically. `null` = not yet available.
   */
  socials: {
    github: null as string | null,
    linkedin: null as string | null,
  },
  /**
   * Drop the real resume PDF at `public/resume.pdf` to enable the
   * download buttons. When absent they are rendered but disabled.
   */
  resumePath: '/resume.pdf',
} as const

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export function hasResume(): boolean {
  return true
}
