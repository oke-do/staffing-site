import { useRef } from 'react'
import { clamp01, ease, usePrefersReducedMotion, useScrollProgress } from '../hooks'
import type { Status } from '../data'
import { Layer, SectionHead } from './ui'

const AMBER = '#e8a04a'
const SOFT = 'rgba(255,255,255,0.35)'
const MUTED = 'rgba(255,255,255,0.5)'

interface Scenario {
  kicker: string
  title: [string, string]
  problem: string
  solution: string
  chip: { status: Status; label: string }
}

const SCENARIOS: Scenario[] = [
  {
    kicker: 'Ситуация 1 · сезонный пик',
    title: ['В декабре нагрузка', 'вырастает втрое'],
    problem:
      'Штатные кладовщики не справляются, а нанимать людей в штат на два месяца долго и невыгодно: потом придётся расставаться с ними и платить компенсации.',
    solution:
      'Нужна временная рабочая сила на горячий период. Закон оставляет два пути: срочные трудовые договоры для сезонных и временных работ (ст. 59 ТК РФ) или временный персонал через аккредитованное агентство в допустимых случаях.',
    chip: { status: 'limited', label: 'Лизинг: временный персонал' },
  },
  {
    kicker: 'Ситуация 2 · непрофильные процессы',
    title: ['Завод тратит силы', 'не на то'],
    problem:
      'Уборщики, грузчики, операторы упаковки — это нагрузка на бухгалтерию и HR: обучение, спецодежда, контроль охраны труда, дисциплина.',
    solution:
      'Передать участок подрядчику целиком: он сам подбирает, обучает и ведёт людей, а вы принимаете результат. Менеджмент освобождается для основных задач.',
    chip: { status: 'ok', label: 'Аутсорсинг' },
  },
  {
    kicker: 'Ситуация 3 · лимит численности',
    title: ['Хочется не выйти', 'за лимит штата'],
    problem:
      'Компания подходит к лимиту численности для упрощённой системы налогообложения, а рабочие руки нужны постоянно.',
    solution:
      'Соблазн — «вывести» людей к агентству, оставив их на своём складе под своим руководством. Но это классический заёмный труд: риски по ТК и при налоговой проверке. Честные пути — настоящий аутсорсинг участка или разговор с налоговым консультантом о режиме.',
    chip: { status: 'banned', label: 'Вывод за штат — риск' },
  },
]

/* ————— visual 1: seasonal peak ————— */

const LOAD = [60, 58, 60, 62, 60, 60, 62, 65, 75, 95, 130, 180]
const MONTHS = ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']

function Peak({ sub }: { sub: number }) {
  const base = 330
  const k = 260 / 180
  const cap = 80
  const grow = ease(sub / 0.4)
  const capOp = clamp01((sub - 0.35) / 0.15)
  const exOp = clamp01((sub - 0.55) / 0.2)
  const lbl = clamp01((sub - 0.75) / 0.15)
  return (
    <>
      <text x="12" y="26" fill={MUTED} className="text-[18px] md:text-[14px]">
        условная нагрузка на склад по месяцам
      </text>
      {LOAD.map((v, i) => {
        const x = 12 + i * 48
        const H = v * k * grow
        const baseH = Math.min(H, cap * k)
        const exH = Math.max(0, H - baseH)
        return (
          <g key={i}>
            <rect x={x} y={base - baseH} width="36" height={baseH} rx="4" fill={SOFT} />
            <rect x={x} y={base - H} width="36" height={exH} rx="4" fill={AMBER} opacity={0.2 + 0.8 * exOp} />
            <text x={x + 18} y="354" textAnchor="middle" fill={MUTED} className="text-[18px] md:text-[14px]">
              {MONTHS[i]}
            </text>
          </g>
        )
      })}
      <g opacity={capOp}>
        <line x1="0" x2="600" y1={base - cap * k} y2={base - cap * k} stroke="#fff" strokeOpacity="0.7" strokeDasharray="5 6" />
        <text x="4" y={base - cap * k - 8} textAnchor="start" fill="#fff" fillOpacity="0.75" className="text-[18px] md:text-[14px]">
          возможности штата
        </text>
      </g>
      <text x="520" y="104" textAnchor="end" fill={AMBER} className="text-[19px] md:text-[15px]" opacity={lbl}>
        нужны временные люди
      </text>
    </>
  )
}

/* ————— visual 2: hand a process to a contractor ————— */

const BLOCKS = ['Уборка', 'Погрузка и разгрузка', 'Упаковка']

function Handoff({ sub }: { sub: number }) {
  const arrow = clamp01((sub - 0.15) / 0.15)
  const left = clamp01((sub - 0.75) / 0.15)
  return (
    <>
      <rect x="15" y="50" width="265" height="270" rx="24" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="320" y="50" width="265" height="270" rx="24" fill="rgba(232,160,74,0.05)" stroke={AMBER} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 6" />
      <text x="147" y="38" textAnchor="middle" fill={MUTED} className="text-[18px] md:text-[14px]" letterSpacing="1.5">
        ЗАВОД
      </text>
      <text x="452" y="38" textAnchor="middle" fill={AMBER} className="text-[18px] md:text-[14px]" letterSpacing="1.5">
        ПОДРЯДЧИК
      </text>
      <text x="300" y="190" textAnchor="middle" fill={AMBER} fontSize="30" opacity={arrow}>
        →
      </text>

      {BLOCKS.map((b, i) => {
        const t = ease((sub - 0.25 - i * 0.15) / 0.25)
        const x = 30 + 305 * t
        return (
          <g key={b}>
            <rect x={x} y={80 + i * 70} width="235" height="52" rx="26" fill={t > 0.5 ? 'rgba(232,160,74,0.12)' : 'rgba(255,255,255,0.06)'} stroke={t > 0.5 ? AMBER : '#fff'} strokeOpacity={t > 0.5 ? 1 : 0.3} strokeWidth="1.5" />
            <text x={x + 117} y={112 + i * 70} textAnchor="middle" fill="#fff" className="text-[19px] md:text-[15px]" fontWeight="500">
              {b}
            </text>
          </g>
        )
      })}

      <text x="147" y="300" textAnchor="middle" fill="#fff" fillOpacity="0.8" className="text-[19px] md:text-[15px]" fontStyle="italic" opacity={left}>
        остаётся основное дело
      </text>
      <text x="452" y="300" textAnchor="middle" fill={AMBER} fontSize="13" opacity={clamp01((sub - 0.7) / 0.2)}>
        подбор · обучение · дисциплина · выход
      </text>
    </>
  )
}

/* ————— visual 3: headcount limit ————— */

const PEOPLE = 20
const IN_STAFF = 15

function Limit({ sub }: { sub: number }) {
  const move = ease((sub - 0.55) / 0.2)
  const verdict = clamp01((sub - 0.8) / 0.15)
  const over = sub > 0.4 && move < 0.5
  const lineX = 40 + 15 * 28 + 14
  const caption =
    sub < 0.3
      ? 'штат растёт'
      : sub < 0.55
        ? 'нужны ещё люди — лимит превышен'
        : sub < 0.8
          ? 'после «вывода» формально штат в норме'
          : ''
  return (
    <>
      <text x="40" y="60" fill={MUTED} className="text-[18px] md:text-[14px]">
        численность штата
      </text>
      <line x1={lineX} x2={lineX} y1="85" y2="215" stroke={over ? '#fda4af' : '#fff'} strokeOpacity={over ? 1 : 0.6} strokeWidth="1.5" strokeDasharray="5 5" />
      <text x={lineX} y="76" textAnchor="middle" fill={over ? '#fda4af' : '#fff'} fillOpacity={over ? 1 : 0.7} className="text-[18px] md:text-[14px]">
        лимит численности
      </text>

      {Array.from({ length: PEOPLE }, (_, i) => {
        const extra = i >= IN_STAFF
        const op = extra
          ? clamp01((sub - 0.3) / 0.12 - (i - IN_STAFF) * 0.15)
          : clamp01(sub * 5 - i * 0.2)
        const y = 140 + (extra ? 150 * move : 0)
        return (
          <g key={i} transform={`translate(${40 + i * 28} ${y})`} fill={extra ? AMBER : '#fff'} fillOpacity={op * (extra ? 1 : 0.85)}>
            <circle cx="0" cy="-8" r="5.5" />
            <path d="M-10 13 C-10 3 -6 -1 0 -1 C6 -1 10 3 10 13 Z" />
          </g>
        )
      })}

      <rect x="20" y="235" width="560" height="100" rx="22" fill="none" stroke={AMBER} strokeOpacity={0.6 * move} strokeDasharray="4 6" strokeWidth="1.5" />
      <text x="40" y="258" fill={AMBER} className="text-[18px] md:text-[14px]" opacity={move}>
        агентство — формальный работодатель
      </text>

      <text x="300" y="215" textAnchor="middle" fill="#fff" fillOpacity="0.85" className="text-[20px] md:text-[16px]" fontStyle="italic">
        {caption}
      </text>
      <text x="300" y="366" textAnchor="middle" fill="#fda4af" className="text-[19px] md:text-[15px]" opacity={verdict}>
        под риском: ст. 56.1 ТК РФ · ст. 54.1 НК РФ
      </text>
    </>
  )
}

function Visual({ idx, sub }: { idx: number; sub: number }) {
  return (
    <svg viewBox="0 0 600 380" className="h-full w-full" role="img" aria-label="Иллюстрация ситуации">
      {idx === 0 ? <Peak sub={sub} /> : idx === 1 ? <Handoff sub={sub} /> : <Limit sub={sub} />}
    </svg>
  )
}

function ScenarioText({ s }: { s: Scenario }) {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{s.kicker}</p>
      <h3 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
        {s.title[0]} <span className="font-display italic text-[#e8a04a]">{s.title[1]}</span>
      </h3>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
        <span className="text-white/35">Проблема. </span>
        {s.problem}
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
        <span className="text-[#e8a04a]">Решение. </span>
        {s.solution}
      </p>
    </>
  )
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  const raw = p * SCENARIOS.length
  const idx = Math.min(SCENARIOS.length - 1, Math.floor(raw))
  const sub = clamp01(raw - idx)

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[36dvh_1fr] items-center gap-2 px-6 pb-16 pt-20 md:grid-cols-[1fr_1.05fr] md:grid-rows-1 md:gap-10 md:px-10 md:pb-20 md:pt-24">
          <div className="order-1 grid h-full min-h-0 md:order-2">
            {SCENARIOS.map((_, i) => (
              <div
                key={i}
                className="h-full min-h-0 [grid-area:1/1]"
                style={{ opacity: i === idx ? 1 : 0, transition: 'opacity 0.6s ease' }}
              >
                <Visual idx={i} sub={i === idx ? sub : i < idx ? 1 : 0} />
              </div>
            ))}
          </div>
          <div className="order-2 grid md:order-1">
            {SCENARIOS.map((s, i) => (
              <Layer key={s.kicker} on={i === idx}>
                <ScenarioText s={s} />
              </Layer>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2">
          {SCENARIOS.map((s, i) => (
            <span
              key={s.kicker}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'w-8 bg-[#e8a04a]' : i < idx ? 'w-3 bg-white/50' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Static() {
  return (
    <div className="mx-auto mt-14 grid max-w-6xl gap-16 px-6 md:px-10">
      {SCENARIOS.map((s, i) => (
        <div key={s.kicker} className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <ScenarioText s={s} />
          </div>
          <div className="h-72">
            <Visual idx={i} sub={1} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Scenarios() {
  const reduced = usePrefersReducedMotion()
  return (
    <section id="scenarios" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32">
        <SectionHead
          kicker="Ситуации из практики"
          plain="Три случая —"
          accent="три решения"
          lead="Типичные задачи склада и производства."
        />
      </div>
      {reduced ? <Static /> : <div className="mt-6"><Pinned /></div>}
    </section>
  )
}
