import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Lazy3DProps {
  /** Render-prop receives `active` (in render range) for frameloop control. */
  children: (state: { active: boolean }) => ReactNode
  fallback?: ReactNode
  /** Distance at which the scene starts rendering (pre-warm margin). */
  rootMargin?: string
  /** Distance beyond which the canvas unmounts, freeing its WebGL context. */
  unmountMargin?: string
  className?: string
}

/**
 * Performance gate with a two-tier lifecycle:
 *  - `active` (tight margin): drives frameloop on/off.
 *  - `mounted` (wide margin): mounts/unmounts the canvas so the number of
 *    simultaneously alive WebGL contexts stays small (browsers cap them).
 * Also recovers automatically from `webglcontextlost` by remounting.
 */
export default function Lazy3D({
  children,
  fallback,
  rootMargin = '240px',
  unmountMargin = '900px',
  className,
}: Lazy3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  // Lifecycle observers.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const near = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin },
    )
    const far = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { rootMargin: unmountMargin },
    )
    near.observe(el)
    far.observe(el)
    return () => {
      near.disconnect()
      far.disconnect()
    }
  }, [rootMargin, unmountMargin])

  // WebGL context-loss recovery: remount for a fresh context.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onLost = (e: Event) => {
      e.preventDefault()
      setMounted(false)
      requestAnimationFrame(() => setMounted(true))
    }
    el.addEventListener('webglcontextlost', onLost)
    return () => el.removeEventListener('webglcontextlost', onLost)
  }, [])

  return (
    <div ref={ref} className={className ? `lazy-3d ${className}` : 'lazy-3d'}>
      {mounted ? children({ active }) : fallback}
    </div>
  )
}
