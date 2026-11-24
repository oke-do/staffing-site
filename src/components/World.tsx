import { useState, type PointerEvent } from 'react'
import { WORLD } from '../data/worldmap'
import { Reveal, Section, SectionHead } from './ui'

const CASES: { place: string; title: string; text: string }[] = [
  {
    place: 'Европейский союз',
    title: 'Равные условия',
    text: 'Директива 2008/104/EC о временной работе через агентства признаёт такую занятость легальной, но требует, чтобы агентские работники получали как минимум те же основные условия труда и оплаты, что и штатные сотрудники заказчика.',
  },
  {
    place: 'США',
    title: 'Рынок и доктрина совместного работодателя',
    text: 'Агентства временного персонала и PEO (professional employer organization) работают открыто: PEO берёт на себя кадры, зарплату, налоги и льготы. Но если заказчик фактически руководит работником, ответственность может быть разделена между ними.',
  },
  {
    place: 'Международная практика',
    title: 'Баланс гибкости и защиты',
    text: 'Конвенция МОТ № 181 (1997) о частных агентствах занятости признаёт их роль на рынке труда, но требует защищать права работников, которых они предоставляют.',
  },
]

type RegionId = 'eu' | 'us' | 'ru' | 'cn' | 'jp'

const REGIONS: Record<RegionId, { name: string; badge: string; text: string }> = {
  eu: {
    name: 'Европейский союз',
    badge: 'Директива 2008/104/EC',
    text: 'Работа через агентства легальна, но агентские работники получают те же основные условия труда и оплаты, что и штатные сотрудники заказчика.',
  },
  us: {
    name: 'США',
    badge: 'Совместный работодатель',
    text: 'Агентства временного персонала и PEO работают открыто. Если заказчик фактически руководит работником, ответственность может делиться между ним и агентством.',
  },
  ru: {
    name: 'Россия',
    badge: 'Гл. 53.1 ТК РФ',
    text: 'С 2016 года заёмный труд запрещён (ст. 56.1). С 1 января 2025 года допускается предоставление труда работников только через аккредитованные агентства и только в определённых случаях.',
  },
  cn: {
    name: 'Китай',
    badge: 'Предел 10 %',
    text: 'Командированный персонал допускается только на временные (до 6 месяцев), вспомогательные и замещающие должности. Доля таких работников — не более 10 % штата. Оплата должна быть равной оплате штатных работников на тех же позициях.',
  },
  jp: {
    name: 'Япония',
    badge: 'Закон 1986 года',
    text: 'Предоставление работников регулируется Законом о командировании работников. По поправкам 2015 года один работник может оставаться в одном подразделении заказчика не дольше трёх лет, затем заказчик обязан предложить ему постоянную работу или перевести его.',
  },
}

const ORDER: RegionId[] = ['eu', 'us', 'ru', 'cn', 'jp']

function WorldMap() {
  const [active, setActive] = useState<RegionId | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }
  const info = active ? REGIONS[active] : null
  const flipX = pos.x > 520

  return (
    <div className="mt-14">
      <div className="relative" onPointerMove={track} onPointerLeave={() => setActive(null)}>
        <svg viewBox={`0 0 ${WORLD.W} ${WORLD.H}`} role="img" aria-label="Карта мира: страны, где регулируется предоставление персонала" className="h-auto w-full">
          <path d={WORLD.dots.land} stroke="#fff" strokeOpacity="0.16" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {ORDER.map((id) => {
            const on = active === id
            return (
              <g key={id}>
                <path
                  d={WORLD.dots[id]}
                  stroke="#e8a04a"
                  strokeOpacity={on ? 1 : 0.55}
                  strokeWidth={on ? 3.6 : 2.6}
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: 'stroke-opacity .3s, stroke-width .3s', filter: on ? 'drop-shadow(0 0 6px rgba(232,160,74,.8))' : undefined }}
                />
                <path
                  d={WORLD.hit[id]}
                  fill="#e8a04a"
                  fillOpacity={on ? 0.1 : 0.001}
                  stroke="#e8a04a"
                  strokeOpacity={on ? 0.5 : 0}
                  strokeWidth="1"
                  className="cursor-pointer"
                  onPointerEnter={() => setActive(id)}
                  onPointerDown={() => setActive(id)}
                />
              </g>
            )
          })}
        </svg>

        {info ? (
          <div
            className="pointer-events-none absolute z-10 hidden w-[min(320px,80vw)] md:block rounded-2xl border border-[#e8a04a]/40 bg-black/85 p-5 backdrop-blur-md"
            style={{ left: flipX ? pos.x - 336 : pos.x + 16, top: Math.max(0, pos.y - 20) }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8a04a]">{info.badge}</p>
            <h3 className="mt-2 font-display text-2xl italic text-white">{info.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">{info.text}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ORDER.map((id) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            onFocus={() => setActive(id)}
            aria-pressed={active === id}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === id ? 'border-[#e8a04a] bg-[#e8a04a]/15 text-white' : 'border-white/20 text-white/70 hover:bg-white/10'
            }`}
          >
            {REGIONS[id].name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/35">Карта схематична: показаны регионы, где модель урегулирована законом.</p>
      {info ? <p className="mt-3 text-sm leading-relaxed text-white/70 md:hidden">{info.text}</p> : null}
    </div>
  )
}

export default function World() {
  return (
    <Section id="world">
      <SectionHead
        kicker="Опыт других стран"
        plain="Как это устроено"
        accent="в мире"
        lead="Там, где модель легализована, рынок не получил свободу без условий: везде действует принцип «равенство условий» и разделённая ответственность."
      />
      <Reveal>
        <WorldMap />
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.place} delay={i * 80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{c.place}</p>
            <h3 className="mt-4 font-display text-2xl italic leading-snug text-white">{c.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{c.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
