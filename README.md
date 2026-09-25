# Muhammad Jawad Ali — Portfolio

Premium interactive 3D portfolio for **Muhammad Jawad Ali** — Software Engineer | AI, Machine Learning & Computer Vision (Lahore, Pakistan).

Built with **Vite + React 19 + TypeScript**, **React Three Fiber** (Three.js) and **Framer Motion**. All content is structured data derived strictly from the resume — no fabricated statistics, projects, or links.

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # typecheck + production build
npm run preview    # preview the production build
```

## Configure before going live

| What | Where | Notes |
| --- | --- | --- |
| Resume download | `public/resume.pdf` | Drop the real resume PDF here. The **Download Resume** buttons link to `/resume.pdf`. |
| Hero portrait | `public/assets/jawad-portrait-hero.jpg` | Pre-cropped 4:5 waist-up crop of the uploaded photo (face kept clear of overlays). Replace with a new crop of `public/assets/jawad-portrait.jpg` (the original full photo) if desired. |
| GitHub URL | `src/data/site.ts` → `site.socials.github` | `null` renders the button disabled with a tooltip — no invented URLs. |
| LinkedIn URL | `src/data/site.ts` → `site.socials.linkedin` | Same behavior. |
| Project repos/demos | `src/data/projects.ts` → `github` / `demo` | Add real URLs only when they exist. |

## Architecture

```
src/
  data/           # Single source of truth: profile, projects, experience, skills
  components/
    ui/           # Reveal, MagneticButton, SectionHeader, Icon
    three/        # NeuralCore hero scene, TechOrbit, ProjectVisuals, Lazy3D gate
    Navbar.tsx, CustomCursor.tsx
  sections/       # Hero, About, Experience, Projects, Skills, HowIBuild, Education, Contact, Footer
  styles/         # base.css (tokens), components.css, three.css
```

Key behaviors:

- **3D is lazy & gated**: `Lazy3D` mounts canvases only when near the viewport (300px margin) and sets `frameloop="never"` when offscreen — no GPU burn on hidden scenes.
- **Graceful degradation**: mobile / reduced-motion devices get a low-poly hero, `demand` frameloops, and reduced particle counts.
- **Reduced motion**: respected in cursor, reveals, magnetic buttons, smooth scroll, and all 3D scenes.
- **Truthful content**: the 94% figure is labeled as resume-stated validation accuracy; the DRS project is explicitly presented as a low-cost research implementation, not professional DRS.
