import { ArrowUpRight } from 'lucide-react'
import { MODEL_ORDER, MODELS } from '../data'
import Diagram from './Diagram'

/** prefers-reduced-motion fallback: no pinning, no scroll-driven morphing —
 *  each model gets its own static block with its own diagram. */
export default function StaticHero() {
  return (
    <div id="models" className="relative">
      <div className="mx-auto flex max-w-3xl flex-col justify-center px-6 pb-16 pt-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Основные понятия</p>
        <h2 className="mt-4 text-4xl font-light leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl">
          Три способа привлечь людей, которых нет <span className="font-display italic text-[#e8a04a]">в штате</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/70">
          Выглядят похоже, но юридически и по последствиям — это разные вещи.
        </p>
      </div>

      {MODEL_ORDER.map((id) => {
        const m = MODELS[id]
        return (
          <div key={id} className="border-t border-white/10 px-6 py-16 md:px-10">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                  {m.num} — {m.name}
                </p>
                <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
                  {m.headline[0]} <span className="font-display italic text-[#e8a04a]">{m.headline[1]}</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/80">{m.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{m.note}</p>
              </div>
              <Diagram model={id} className="w-full" />
            </div>
          </div>
        )
      })}

      <div className="border-t border-white/10 px-6 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
          Важно не название, а <span className="font-display italic text-[#e8a04a]">кто руководит</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70">
          Суды и инспекции смотрят на суть: кто ставит задачи, кто контролирует, где рабочее место.
        </p>
        <a
          href="#compare"
          className="group mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-[#e8a04a] py-2 pl-7 pr-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#d68d35]"
        >
          К сравнению
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/85">
            <ArrowUpRight size={16} className="text-[#e8a04a]" />
          </span>
        </a>
      </div>
    </div>
  )
}
