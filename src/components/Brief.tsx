import { Briefcase, UserCheck, Scale } from 'lucide-react'
import { Reveal } from './ui'

const TERMS: { name: string; tag: string; text: string }[] = [
  {
    name: 'Аутсорсинг',
    tag: 'Покупка результата',
    text: 'Покупка результата внешней команды: заказчик платит за итог работы, а не за труд конкретных людей.',
  },
  {
    name: 'Аутстаффинг',
    tag: 'Предоставление персонала',
    text: 'Предоставление персонала, который работает под управлением заказчика, но числится у агентства.',
  },
  {
    name: 'Лизинг персонала',
    tag: 'Не правовой термин',
    text: '«Лизинг персонала» не является правовым термином: так на рынке называют предоставление работников.',
  },
]

const QUESTIONS = [
  { icon: Briefcase, text: 'Что именно вы покупаете?' },
  { icon: UserCheck, text: 'Кто управляет людьми?' },
  { icon: Scale, text: 'Кто отвечает за результат?' },
]

export default function Brief() {
  return (
    <section id="brief" className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Короткий ответ</p>
          <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
            Три модели — <span className="font-display italic text-[#e8a04a]">три определения</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TERMS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <span className="font-display text-5xl italic text-[#e8a04a]/60">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-3xl italic text-white">{t.name}</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#e8a04a]">{t.tag}</p>
              <p className="mt-5 text-base leading-relaxed text-white/70">{t.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl" delay={80}>
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            Модель выбирают по тому, <span className="text-white">кто управляет процессом и несёт ответственность</span>.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={120}>
          <p className="text-xs text-white/40">Три вопроса, которые всё решают</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {QUESTIONS.map((q, i) => (
              <div key={q.text} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8a04a] text-black">
                  <q.icon size={20} />
                </span>
                <span className="text-sm text-white/85">
                  <span className="mr-2 font-display italic text-[#e8a04a]">{i + 1}</span>
                  {q.text}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
