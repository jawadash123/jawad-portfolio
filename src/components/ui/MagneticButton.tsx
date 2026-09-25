import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'default' | 'ghost'
  strength?: number
  href?: string
  /** Anchor-only props passed through when `href` is set. */
  download?: string
  target?: string
  rel?: string
}

/**
 * Premium CTA: leans toward the pointer (magnetic), tracks a radial
 * sheen via --mx, and respects reduced-motion by disabling the pull.
 */
export default function MagneticButton({
  children,
  variant = 'default',
  strength = 0.35,
  href,
  download,
  target,
  rel,
  className = 'btn',
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - r.left
    const my = e.clientY - r.top
    x.set((mx - r.width / 2) * strength)
    y.set((my - r.height / 2) * strength)
    el.style.setProperty('--mx', `${(mx / r.width) * 100}%`)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const cls = `btn btn-${variant} ${className !== 'btn' ? className : ''}`.trim()
  const inner = <span className="btn-label">{children}</span>

  if (href) {
    const anchorProps = { download, target, rel }
    return (
      <motion.a
        className={cls}
        href={href}
        ref={ref as never}
        style={{ x: sx, y: sy }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursor:active'))}
        onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursor:inactive'))}
        {...anchorProps}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={cls}
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursor:active'))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursor:inactive'))}
      {...(rest as object)}
    >
      {inner}
    </motion.button>
  )
}
