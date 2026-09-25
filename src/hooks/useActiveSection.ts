import { useEffect, useState } from 'react'

/** Tracks which page section is currently in view for nav highlighting. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        if (visible.size) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0]
          setActive(top)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
