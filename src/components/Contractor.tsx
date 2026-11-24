import { Reveal, Section, SectionHead } from './ui'
import { asset } from '../asset'

const CRITERIA: { title: string; text: string }[] = [
  {
    title: 'Опыт и репутация',
    text: 'Сколько лет компания на рынке. Попросите кейсы и контакты действующих клиентов, чтобы узнать отзывы.',
  },
  {
    title: 'Собственная база людей',
    text: 'Откуда берётся персонал. Есть ли свой отдел подбора и резерв для быстрой замены.',
  },
  {
    title: 'Юридическая чистота',
    text: 'Прозрачный договор, реальный штат и уплата налогов; если подрядчик предоставляет персонал — аккредитация.',
  },
  {
    title: 'Скорость реакции',
    text: 'Как быстро готовы вывести бригаду по заявке. Срок лучше закрепить в договоре, а не в устной договорённости.',
  },
  {
    title: 'Ответственный на объекте',
    text: 'Бригадир, который управляет линейным персоналом. Он освобождает вас от микроменеджмента — и поддерживает признаки настоящего аутсорсинга.',
  },
  {
    title: 'Материальная ответственность',
    text: 'Чётко прописана в договоре и подкреплена, например, страхованием: «дикая» бригада может исчезнуть вместе с грузом.',
  },
]

export default function Contractor() {
  return (
    <Section id="contractor">
      <SectionHead
        kicker="Практический чек-лист"
        plain="Как выбрать"
        accent="подрядчика"
        lead="Рынок переполнен предложениями. Шесть критериев, которые отсеивают большинство ненадёжных исполнителей."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-[0.8fr_1.4fr]">
        <Reveal className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 md:block">
          <img src={asset('/img/06.jpg')} alt="Клинер" loading="lazy" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
            Шесть критериев надёжности
          </span>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {CRITERIA.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-display text-3xl italic text-[#e8a04a]">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-xl font-light tracking-[-0.02em] text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
