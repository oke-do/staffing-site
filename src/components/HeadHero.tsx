import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { clamp01 } from '../hooks'
import { asset } from '../asset'

export const AUTHOR = {
  name: 'Болотин Роман Алексеевич',
  group: 'М-34',
}

export const TOPIC_MAIN = 'Лизинг, аутстаффинг и аутсорсинг персонала:'
export const TOPIC_SUB = 'опыт и проблемы использования'

export const INTRO: string[] = [
  'Компаниям всё чаще нужны люди «здесь и сейчас»: на сезонный пик, на проект, на функцию, которую невыгодно держать внутри. Для этого используют аутсорсинг, аутстаффинг и лизинг персонала.',
  'Выглядят эти модели похоже, но отличаются тем, кто работодатель, кто руководит работником и кто отвечает за результат. Ошибка в выборе может обернуться штрафами, налоговыми доначислениями и спорами о трудовых отношениях.',
]

/** Duration of head.mp4 (one full camera orbit, ends on the same frame it starts on). */
const FALLBACK_DURATION = 4.0417

/*  Scroll timeline (progress of the pinned section, 0 → 1):
 *   0.02 → 0.72  the camera orbits the head (video scrubbed 0 → 360°)
 *   0.28 → 0.66  the portrait collapses toward its centre and dissolves — still rotating
 *   0.50 → 0.94  the topic and the introduction pour in, in the portrait's place
 */
const ROT_START = 0.02
const ROT_END = 0.72
const SHRINK_START = 0.28
const SHRINK_END = 0.66
const FADE_START = 0.46

function progressToTime(p: number, duration: number): number {
  return clamp01((p - ROT_START) / (ROT_END - ROT_START)) * duration
}

/** Approximation of cubic-bezier(0.16,1,0.3,1) — fast out, long settle. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Scroll-mapped reveal: pours in across [start, start+span] of progress. Fully reversible. */
function rev(p: number, start: number, span = 0.12, dy = 24, blur = 8): CSSProperties {
  const e = easeOut(clamp01((p - start) / span))
  return {
    opacity: e,
    transform: `translateY(${(dy * (1 - e)).toFixed(2)}px)`,
    filter: `blur(${(blur * (1 - e)).toFixed(2)}px)`,
  }
}

function Words({ text, p, start, step = 0.03, span = 0.12 }: { text: string; p: number; start: number; step?: number; span?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block" style={rev(p, start + i * step, span, 26, 10)}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}

function Author({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Автор</p>
      <p className="mt-1.5 font-display text-xl italic leading-tight text-white md:text-[26px]">{AUTHOR.name}</p>
      <p className="mt-1 text-xs text-white/50">группа {AUTHOR.group}</p>
    </div>
  )
}

export default function HeadHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeRef = useRef(0)
  const [p, setP] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    let raf = 0
    const tick = () => {
      const wrapper = wrapperRef.current
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        const scrollable = rect.height - window.innerHeight
        const progress = clamp01(-rect.top / scrollable)
        setP(Math.round(progress * 1000) / 1000)

        if (video) {
          // scrub with inertia: lerp currentTime toward the time mapped from scroll
          const duration = video.duration || FALLBACK_DURATION
          const target = progressToTime(progress, duration)
          const cur = timeRef.current
          const next = cur + (target - cur) * 0.12
          if (Math.abs(next - cur) > 0.0005) {
            timeRef.current = next
            video.currentTime = next
          } else if (cur !== target) {
            timeRef.current = target
            video.currentTime = target
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])


  // portrait: collapses to a point while it keeps turning, then dissolves
  const shrink = easeInOut(clamp01((p - SHRINK_START) / (SHRINK_END - SHRINK_START)))
  const scale = 1 - 0.9 * shrink
  const fade = 1 - clamp01((p - FADE_START) / (SHRINK_END - FADE_START))
  const portraitStyle: CSSProperties = {
    transform: `scale(${scale.toFixed(3)})`,
    opacity: fade,
    filter: `blur(${(shrink * 6).toFixed(2)}px)`,
    visibility: fade <= 0.001 ? 'hidden' : 'visible',
  }

  return (
    <div ref={wrapperRef} id="top" className="relative h-[560vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* warm glow behind the stage */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_50%_50%,rgba(232,160,74,0.13),transparent_70%)]" />

        {/* portrait + its caption: share the centre of the stage with the text that replaces them */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-16 pt-20">
          <div
            className="relative aspect-[4/5] w-[min(76vw,calc(56dvh*0.8))] md:w-[min(40vw,calc(70dvh*0.8))]"
            style={portraitStyle}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/15 bg-neutral-400 shadow-[0_30px_120px_-30px_rgba(232,160,74,0.35)]">
              <video
                ref={videoRef}
                src={asset('/head.mp4')}
                poster={asset('/head-poster.jpg')}
                muted
                playsInline
                preload="auto"
                aria-label="Автор работы: камера медленно облетает его голову"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />
            </div>

            {/* author: right next to the head on desktop, under it on mobile */}
            <div className="pointer-events-none absolute left-0 right-0 top-full mt-5 text-center md:inset-x-auto md:left-full md:top-1/2 md:mt-0 md:ml-10 md:w-[min(300px,22vw)] md:-translate-y-1/2 md:text-left">
              <div className="mx-auto mb-4 h-px w-12 bg-[#e8a04a]/70 md:mx-0 md:w-16" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Автор</p>
              <p className="mt-2 font-display text-xl italic leading-tight text-white md:text-[28px]">{AUTHOR.name}</p>
              <p className="mt-2 text-xs tracking-[0.2em] text-[#e8a04a] md:text-sm">группа {AUTHOR.group}</p>
            </div>
          </div>
        </div>

        {/* topic + introduction: pour in where the head was */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pb-20 pt-20 text-center"
          style={{ visibility: p > 0.48 ? 'visible' : 'hidden' }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40" style={rev(p, 0.5)}>
            Тема работы
          </p>
          <h1 className="mt-4 max-w-4xl text-[30px] font-light leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            <Words text={TOPIC_MAIN} p={p} start={0.54} />
            <br />
            <span className="font-display italic text-[#e8a04a]">
              <Words text={TOPIC_SUB} p={p} start={0.66} step={0.035} />
            </span>
          </h1>

          <div className="mt-8 max-w-2xl md:mt-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40" style={rev(p, 0.77, 0.08)}>
              Введение
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/85 md:text-base" style={rev(p, 0.8, 0.1)}>
              {INTRO[0]}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/55 md:text-sm" style={rev(p, 0.87, 0.1)}>
              {INTRO[1]}
            </p>
          </div>
        </div>

        {/* author: always present, bottom-left */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center md:bottom-8 md:flex"
          style={{ opacity: 1 - clamp01(p / 0.05), transition: 'opacity 0.3s' }}
        >
          <ChevronDown className="h-5 w-5 animate-bounce-slow text-white/50" />
        </div>
      </div>
    </div>
  )
}

/** prefers-reduced-motion fallback: still portrait, all text visible. */
export function HeadHeroStatic() {
  return (
    <div id="top" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-2 md:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_30px_120px_-30px_rgba(232,160,74,0.35)]">
            <img src={asset('/head-poster.jpg')} alt="Автор работы" className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Тема работы</p>
          <h1 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
            {TOPIC_MAIN} <span className="font-display italic text-[#e8a04a]">{TOPIC_SUB}</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/80">{INTRO[0]}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{INTRO[1]}</p>
          <Author className="mt-10" />
        </div>
      </div>
    </div>
  )
}
