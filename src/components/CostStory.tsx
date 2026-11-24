import { useRef } from 'react'
import { clamp01, ease, usePrefersReducedMotion, useScrollProgress } from '../hooks'
import { Layer, SectionHead } from './ui'

const AMBER = '#e8a04a'
const MAX = 85000

interface Row {
  label: string
  from: number
  to: number
  value: string
  fill: string
  /** progress window in which the row grows */
  at: [number, number]
}

/** Illustrative: 50 000 net → ≈57 500 gross (НДФЛ 13%) → +30% contributions ≈ 74 700 → up to ≈80 000 with other costs. */
const ROWS: Row[] = [
  { label: 'На руки', from: 0, to: 50000, value: '50 000 ₽', fill: 'rgba(255,255,255,0.85)', at: [0.02, 0.15] },
  { label: '+ НДФЛ', from: 50000, to: 57500, value: '≈ 7 500', fill: 'rgba(255,255,255,0.35)', at: [0.2, 0.32] },
  { label: '+ Страховые взносы (≈30%)', from: 57500, to: 74700, value: '≈ 17 200', fill: 'rgba(232,160,74,0.55)', at: [0.32, 0.44] },
  { label: '+ Подбор, учёт, СИЗ, рабочее место', from: 74700, to: 80000, value: 'до 5 000', fill: AMBER, at: [0.47, 0.62] },
  { label: 'Итого для компании', from: 0, to: 80000, value: '≈ 75–80 тыс. ₽', fill: 'rgba(232,160,74,0.28)', at: [0.66, 0.82] },
]

const STEPS: { kicker: string; title: [string, string]; text: string }[] = [
  {
    kicker: 'Шаг 1 · на руки',
    title: ['Сотруднику вы платите', '50 000 ₽'],
    text: 'Столько человек получает на карту. Но компании он обходится дороже, и именно эту разницу обычно упускают, сравнивая штат с провайдером.',
  },
  {
    kicker: 'Шаг 2 · налоги',
    title: ['Сначала', 'налоги'],
    text: 'С начисленной зарплаты удерживается НДФЛ, а сверху работодатель платит страховые взносы — по общему тарифу около 30%. Вместе это добавляет порядка 25 тысяч рублей.',
  },
  {
    kicker: 'Шаг 3 · всё остальное',
    title: ['Затем', 'невидимые траты'],
    text: 'Подбор (рекрутер, базы резюме), кадровое администрирование и бухучёт, спецодежда, СИЗ, обучение, организация рабочего места. По оценке практиков логистики — ещё до 5 тысяч на человека.',
  },
  {
    kicker: 'Шаг 4 · итог',
    title: ['Реально —', '75–80 тыс. ₽'],
    text: 'Примерно в полтора раза больше суммы на руки. И то, чего нет в счёте: 28 дней отпуска и больничные оплачиваются, но человек в это время не работает.',
  },
  {
    kicker: 'Что это значит',
    title: ['Сравнивайте', 'полную стоимость'],
    text: 'В ставку провайдера те же статьи заложены вместе с его маржой и НДС. Выигрыш не автоматический: он в гибкости, в загрузке (платите за смену или результат) и во входящем НДС для компаний на общей системе.',
  },
]

const BOUNDS = [0.18, 0.45, 0.65, 0.85]

function Chart({ p }: { p: number }) {
  const k = 600 / MAX
  return (
    <svg viewBox="0 0 600 380" className="h-full w-full" role="img" aria-label="Из чего складывается стоимость сотрудника">
      {ROWS.map((r, i) => {
        const t = ease((p - r.at[0]) / (r.at[1] - r.at[0]))
        const y = 40 + i * 70
        const isTotal = i === ROWS.length - 1
        return (
          <g key={r.label} opacity={clamp01(t * 3)}>
            <text x="0" y={y} fill="#fff" fillOpacity={isTotal ? 0.95 : 0.65} className="text-[19px] md:text-[15px]" fontWeight={isTotal ? 600 : 400}>
              {r.label}
            </text>
            <text x="600" y={y} textAnchor="end" fill={isTotal ? AMBER : '#fff'} className="text-[19px] md:text-[15px]" fontWeight="500">
              {r.value}
            </text>
            <rect
              x={r.from * k}
              y={y + 12}
              width={(r.to - r.from) * k * t}
              height="26"
              rx="13"
              fill={r.fill}
              stroke={isTotal ? AMBER : 'none'}
              strokeWidth="1.5"
            />
          </g>
        )
      })}
    </svg>
  )
}

function StepText({ s }: { s: (typeof STEPS)[number] }) {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{s.kicker}</p>
      <h3 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
        {s.title[0]} <span className="font-display italic text-[#e8a04a]">{s.title[1]}</span>
      </h3>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">{s.text}</p>
    </>
  )
}

const FOOTNOTE =
  'Иллюстрация: НДФЛ 13%, общий тариф взносов 30%, прочие расходы — оценка. Реальные ставки зависят от года, дохода работника и статуса работодателя.'

function Pinned() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  const step = BOUNDS.filter((b) => p >= b).length

  return (
    <div ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[36dvh_1fr] items-center gap-2 px-6 pb-16 pt-20 md:grid-cols-[1fr_1.05fr] md:grid-rows-1 md:gap-10 md:px-10 md:pb-20 md:pt-24">
          <div className="order-1 flex h-full min-h-0 flex-col md:order-2">
            <div className="min-h-0 flex-1">
              <Chart p={p} />
            </div>
            <p className="mt-2 text-[10px] leading-snug text-white/35">{FOOTNOTE}</p>
          </div>
          <div className="order-2 grid md:order-1">
            {STEPS.map((s, i) => (
              <Layer key={s.kicker} on={i === step}>
                <StepText s={s} />
              </Layer>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s.kicker}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-[#e8a04a]' : i < step ? 'w-3 bg-white/50' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Static() {
  return (
    <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:px-10">
      <div className="space-y-10">
        {STEPS.map((s) => (
          <div key={s.kicker}>
            <StepText s={s} />
          </div>
        ))}
      </div>
      <div>
        <div className="h-80">
          <Chart p={1} />
        </div>
        <p className="mt-2 text-[10px] leading-snug text-white/35">{FOOTNOTE}</p>
      </div>
    </div>
  )
}

export default function CostStory() {
  const reduced = usePrefersReducedMotion()
  return (
    <section id="cost" className="border-t border-white/10 pb-10">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32">
        <SectionHead
          kicker="Экономика"
          plain="Сколько стоит"
          accent="человек на самом деле"
          lead="Многие считают аутсорсинг и лизинг дорогими из-за комиссии агентства. Но прямой расчёт штатного сотрудника часто даёт неожиданную цифру."
        />
      </div>
      {reduced ? <Static /> : <div className="mt-6"><Pinned /></div>}
    </section>
  )
}
