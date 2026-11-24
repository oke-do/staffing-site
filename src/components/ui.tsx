import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { STATUS_STYLE, type Status } from '../data'

/** One-shot "entered the viewport" flag. */
export function useInView<T extends HTMLElement>(threshold = 0.15): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

/** Fade-up-and-unblur on scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

/** The warm amber glow + blueprint grid + film grain from the «Основные понятия» block,
 *  fixed behind the whole page so every section shares it. */
export function SiteBg() {
  const mask = 'radial-gradient(ellipse 75% 75% at 60% 50%, #000, transparent)'
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_74%_52%,rgba(232,160,74,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_45%_at_14%_88%,rgba(232,160,74,0.06),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative border-t border-white/10 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  )
}

export function SectionHead({
  kicker,
  plain,
  accent,
  lead,
}: {
  kicker: string
  plain: string
  accent: string
  lead?: string
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{kicker}</p>
      <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
        {plain} <span className="font-display italic text-[#e8a04a]">{accent}</span>
      </h2>
      {lead ? <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">{lead}</p> : null}
    </Reveal>
  )
}

/** One scene's text inside a pinned story. All layers share one grid cell,
 *  so the tallest sets the height; inactive layers are hidden after the fade. */
export function Layer({ on, children }: { on: boolean; children: ReactNode }) {
  const style: CSSProperties = {
    gridArea: '1 / 1',
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(18px)',
    filter: on ? 'blur(0)' : 'blur(8px)',
    visibility: on ? 'visible' : 'hidden',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1), visibility 0s linear ${on ? '0s' : '0.7s'}`,
  }
  return (
    <div style={style} aria-hidden={!on} className="self-center">
      {children}
    </div>
  )
}

export function StatusChip({ status, label }: { status: Status; label: string }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {label}
    </span>
  )
}
