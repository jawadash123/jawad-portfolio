import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

/**
 * Real-photo portrait inside a premium glass frame.
 * Effects are edge-only: HUD labels and lighting never cover the face.
 * Tilt is pointer-type-aware (mouse only) and disabled under reduced motion.
 */
export default function PortraitCard() {
  const reduced = usePrefersReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.5 })
  const sry = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.5 })

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.5 })
  const spy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.5 })
  const imgX = useTransform(spx, (v) => v * -8)
  const imgY = useTransform(spy, (v) => v * -8)

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse') return
    const el = frameRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1
    ry.set(nx * 6)
    rx.set(-ny * 6)
    px.set(nx)
    py.set(ny)
    el.style.setProperty('--gx', `${((nx + 1) / 2) * 100}%`)
    el.style.setProperty('--gy', `${((ny + 1) / 2) * 100}%`)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      className="portrait-stage"
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient layers strictly behind the photo */}
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-ring r1" aria-hidden="true" />
      <div className="portrait-ring r2" aria-hidden="true" />

      <motion.div
        ref={frameRef}
        className="portrait-card"
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className="corner tl" aria-hidden="true" />
        <span className="corner tr" aria-hidden="true" />
        <span className="corner bl" aria-hidden="true" />
        <span className="corner br" aria-hidden="true" />

        <div className="portrait-media">
          <motion.img
            src="/assets/jawad-portrait-hero.jpg"
            alt="Portrait of Muhammad Jawad Ali"
            width={520}
            height={650}
            loading="eager"
            decoding="async"
            style={{ x: imgX, y: imgY }}
          />
          <div className="portrait-glare" aria-hidden="true" />
        </div>

        {/* HUD labels — bottom/side edges only, never over the face */}
        <span className="hud hud-name mono" aria-hidden="true">
          PYTHON&nbsp;· PYTORCH&nbsp;· FASTAPI
        </span>
        <span className="hud hud-side mono" aria-hidden="true">
          AI · ML · COMPUTER VISION
        </span>
        <span className="hud hud-status mono" aria-hidden="true">
          <span className="dot" />
          ONLINE
        </span>
      </motion.div>
    </motion.div>
  )
}
