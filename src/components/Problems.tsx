import { Reveal, Section, SectionHead } from './ui'
import { asset } from '../asset'

const PROS: { title: string; text: string }[] = [
  { title: 'Гибкость', text: 'Быстро нарастить или сократить команду под сезон, проект, пик нагрузки.' },
  { title: 'Скорость', text: 'Люди выходят быстрее, чем при собственном поиске и оформлении.' },
  { title: 'Фокус на ядре', text: 'Рутина — кадровое делопроизводство, расчёт зарплаты — уходит провайдеру.' },
  { title: 'Экспертиза', text: 'Узкие компетенции без постоянной ставки в штате.' },
]

const PROBLEMS: { title: string; problem: string; fix: string }[] = [
  {
    title: 'Переквалификация отношений',
    problem: 'Проверка или суд видят «заёмный труд» под видом аутсорсинга и признают отношения трудовыми.',
    fix: 'Договор на результат с измеримыми критериями; задачи работникам ставит только подрядчик.',
  },
  {
    title: 'Налоговые риски',
    problem: 'Провайдер — «пустышка» без штата и платежей, расходы заказчика снимают как необоснованную выгоду.',
    fix: 'Проверять контрагента: реальный штат, опыт, уплата налогов и взносов; хранить акты и отчёты.',
  },
  {
    title: 'Двойное подчинение',
    problem: 'Работник не понимает, кто его начальник; охрана труда, дисциплина и несчастные случаи — зона спора.',
    fix: 'Заранее распределить в договоре ответственность, инструктажи и допуски; назначить единого куратора.',
  },
  {
    title: 'Мотивация и лояльность',
    problem: 'Внешние люди чувствуют себя «вторым сортом»: выше текучесть, ниже вовлечённость, больше конфликтов со штатными.',
    fix: 'Единые стандарты и онбординг, понятные правила общения, прозрачные цели.',
  },
  {
    title: 'Зависимость от поставщика',
    problem: 'Знания и процессы уходят вместе с подрядчиком; смена провайдера превращается в кризис.',
    fix: 'Документировать процессы, закладывать в договор передачу дел и план выхода.',
  },
  {
    title: 'Скрытая стоимость',
    problem: 'К цене услуги добавляются наценка провайдера, управление подрядчиком, юристы, контроль качества.',
    fix: 'Считать полную стоимость владения, а не только ставку «за человека».',
  },
  {
    title: 'Фирмы-однодневки и «дикие» бригады',
    problem:
      'Бригады без репутации предлагают людей «за копейки»: возможны налоговые доначисления, привлечение работников без законных оснований, пропажа груза — а взыскать ущерб почти невозможно.',
    fix: 'Работать с компаниями с репутацией и постоянным офисом, прописать материальную ответственность, проверять разрешительные документы работников.',
  },
  {
    title: 'Конфиденциальность',
    problem: 'Внешние сотрудники получают доступ к данным и системам, но не связаны вашими внутренними политиками.',
    fix: 'NDA, ограниченные права доступа, журналирование, регулярный пересмотр допусков.',
  },
]

export default function Problems() {
  return (
    <Section id="problems">
      <SectionHead
        kicker="Опыт использования"
        plain="Что это даёт — и"
        accent="где болит"
        lead="Модели появились не случайно: у бизнеса есть реальные причины не держать всех людей в штате. Но у каждой выгоды есть обратная сторона."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 md:block">
          <img src={asset('/img/02.jpg')} alt="Рабочий производства" loading="lazy" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
            Гибкий состав под пик
          </span>
        </Reveal>
        <div className="grid content-center gap-4 sm:grid-cols-2">
          {PROS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-display text-xl italic text-[#e8a04a]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-2">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 text-2xl font-light tracking-[-0.02em] text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{p.problem}</p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8a04a]">Как снизить риск</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{p.fix}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
