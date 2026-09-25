import Icon from '../components/ui/Icon'
import { site } from '../data/site'

export default function Footer() {
  const { github, linkedin } = site.socials

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="name">{site.name}</p>
          <p className="tag">Software Engineer | AI • ML • Computer Vision</p>
        </div>
        <div className="footer-right">
          <a
            className="icon-link"
            href={github ?? undefined}
            aria-label="GitHub"
            aria-disabled={!github}
            onClick={(e) => {
              if (!github) e.preventDefault()
            }}
            title={github ? 'GitHub' : 'GitHub URL not configured yet'}
          >
            <Icon name="github" size={17} />
          </a>
          <a
            className="icon-link"
            href={linkedin ?? undefined}
            aria-label="LinkedIn"
            aria-disabled={!linkedin}
            onClick={(e) => {
              if (!linkedin) e.preventDefault()
            }}
            title={linkedin ? 'LinkedIn' : 'LinkedIn URL not configured yet'}
          >
            <Icon name="linkedin" size={17} />
          </a>
          <a className="icon-link" href={`mailto:${site.email}`} aria-label="Email">
            <Icon name="mail" size={17} />
          </a>
        </div>
        <p className="footer-copy">© 2026 Muhammad Jawad Ali — Lahore, Pakistan</p>
      </div>
    </footer>
  )
}
