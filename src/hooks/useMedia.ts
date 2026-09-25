import { useEffect, useState } from 'react'

/** Reactive matchMedia hook. */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
export const useIsMobile = () => useMedia('(max-width: 820px)')
export const useIsTouch = () => useMedia('(hover: none), (pointer: coarse)')
