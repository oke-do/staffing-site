import { useEffect, useState, type RefObject } from 'react'

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
/** Fast out, long settle — same feel as the site's reveal easing. */
export const ease = (t: number) => 1 - Math.pow(1 - clamp01(t), 3)

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** 0→1 progress through a tall wrapper that contains a sticky 100dvh stage. */
export function useScrollProgress(ref: RefObject<HTMLElement>): number {
  const [p, setP] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0
      // quantized so React only re-renders when progress visibly moves
      setP(Math.round(progress * 1000) / 1000)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])
  return p
}
