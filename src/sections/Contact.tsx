import MagneticButton from '../components/ui/MagneticButton'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { site } from '../data/site'

export default function Contact() {
  const { github, linkedin } = site.socials

  return (
    <section id="contact" className="section container" aria-label="Contact">
      <Reveal>
        <div className="contact-box">
          <p className="mono" style={{ color: 'var(--accent-2)', marginBottom: '1rem' }}>
            Contact
          </p>
          <h2>
            Let’s build something <span className="grad-text">intelligent</span>.
          </h2>
          <p className="contact-sub">
            I’m open to software engineering, AI/ML and computer vision opportunities — internships,
            junior roles, or collaborations on systems that matter.
          </p>

          <div className="contact-ctas">
            <MagneticButton
              variant="primary"
              href={`mailto:${site.email}?subject=${encodeURIComponent('Portfolio contact')}`}
            >
              <Icon name="mail" size={16} />
              Email Me
            </MagneticButton>
            <MagneticButton
              href={linkedin ?? undefined}
              disabled={!linkedin}
              aria-disabled={!linkedin}
              title={linkedin ? 'LinkedIn profile' : 'LinkedIn URL not configured yet'}
            >
              <Icon name="linkedin" size={15} />
              LinkedIn
            </MagneticButton>
            <MagneticButton
              href={github ?? undefined}
              disabled={!github}
              aria-disabled={!github}
              title={github ? 'GitHub profile' : 'GitHub URL not configured yet'}
            >
              <Icon name="github" size={15} />
              GitHub
            </MagneticButton>
          </div>

          <div className="contact-cards">
            <a className="contact-card" href={`mailto:${site.email}`}>
              <Icon name="mail" size={17} />
              <span>
                <span className="k">Email</span>
                <span className="v">{site.email}</span>
              </span>
            </a>
            <a className="contact-card" href={`tel:${site.phone.replace(/\s/g, '')}`}>
              <Icon name="phone" size={17} />
              <span>
                <span className="k">Phone</span>
                <span className="v">{site.phone}</span>
              </span>
            </a>
            <div className="contact-card">
              <Icon name="pin" size={17} />
              <span>
                <span className="k">Location</span>
                <span className="v">{site.location}</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
