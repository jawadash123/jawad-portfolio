import { useEffect, useRef } from 'react'
import { useIsTouch } from '../hooks/useMedia'

/**
 * Custom cursor: dot follows instantly, ring trails with lerp.
 * Expands over interactive elements via a global hover listener.
 */
export default function CustomCursor() {
  const isTouch = useIsTouch()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouse = { x: -100, y: -100 }
    let ringPos = { x: -100, y: -100 }
    let firstMove = true
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY }
      if (firstMove) {
        firstMove = false
        ringPos = { ...mouse }
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], [data-cursor="active"], input, textarea, select')
      ring.dataset.active = interactive ? 'true' : 'false'
    }

    const onDown = () => (ring.dataset.pressed = 'true')
    const onUp = () => (ring.dataset.pressed = 'false')

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16
      const half = ring.offsetWidth / 2
      ring.style.transform = `translate(${ringPos.x - half}px, ${ringPos.y - half}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" data-active="false" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
