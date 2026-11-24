import { Reveal, Section, SectionHead } from './ui'
import { asset } from '../asset'

const MOTIVES = [
  'Сократить число сотрудников в штатном расписании.',
  'Снять административную и финансовую нагрузку, сохранив руководство работниками.',
  'Освободиться от части обязательств по трудовым отношениям.',
  'Гибко подстраивать численность под реальный объём работ.',
  'Вести проекты без срочных договоров и выходных пособий по их окончании.',
  'Взять человека «на испытательный срок» через агентство: не подошёл — хлопоты с увольнением на агентстве.',
  'Сохранить статус малого предприятия по численности штата.',
]

const STEPS = [
  'Стороны заключают договор; к нему прилагается список выводимых сотрудников с их данными, обязанностями и условиями оплаты.',
  'Сотрудников переводят к провайдеру, с каждым заключается трудовой договор.',
  'Провайдер командирует их обратно к заказчику — работают они там же и под тем же руководителем.',
  'Каждый месяц провайдер платит зарплату и премии, перечисляет налоги и взносы, ведёт кадровые документы.',
  'Заказчик получает подробный отчёт и счёт: зарплата, налоги, бонусы и вознаграждение провайдера.',
]

const SERVICES = [
  'Расчёт и выплата зарплаты',
  'Больничные, отпускные, командировочные',
  'Налоги и взносы',
  'Бухгалтерские отчёты и справки',
  'Кадровые процедуры',
  'Управление компенсационным пакетом',
  'Прекращение трудовых отношений по требованию клиента',
]

const RISKS = [
  'Неэффективная структура кадров',
  'Некачественная работа кадровой службы',
  'Риск забастовок',
  'Репутационные потери из-за ошибок кадровой службы',
]

const OUTSOURCING_ROWS: { what: string; gain: string }[] = [
  {
    what: 'Кадровое администрирование — в том числе силами «удалённого офиса» подрядчика на территории клиента',
    gain: 'Не нужно подбирать и обучать кадровиков; подрядчик отвечает финансово за результат.',
  },
  {
    what: 'Кадровый учёт в программе подрядчика',
    gain: 'Автоматизация процесса, экономия на покупке и ежегодной поддержке программы.',
  },
  {
    what: 'Расчёт зарплаты и налогов, ведомости, регулярная и аналитическая отчётность',
    gain: 'Высвобождаются сотрудники бухгалтерии; кадры и зарплата сливаются в одну технологическую цепочку.',
  },
  {
    what: 'Сдача отчётности в органы и её защита при необходимости',
    gain: 'Экономится время менеджеров; подрядчик несёт профессиональную и финансовую ответственность за полный цикл.',
  },
]

export default function Practice() {
  return (
    <Section id="practice">
      <SectionHead
        kicker="Практика и опыт"
        plain="Зачем компании"
        accent="этим пользуются"
        lead="Идея выросла из лизинга персонала, популярного на Западе в 1970–80-х. В России такие услуги первыми принесли международные кадровые агентства; чаще всего их использовали для найма программистов, переводчиков и бухгалтеров."
      />

      <Reveal className="mt-10 max-w-3xl rounded-2xl border border-[#e8a04a]/30 bg-[#e8a04a]/[0.06] p-5">
        <p className="text-sm leading-relaxed text-white/80">
          <span className="font-medium text-[#f0b46a]">Как читать этот раздел.</span> Ниже — описание практики по
          учебной литературе. Оно отражает опыт, накопленный в том числе до запрета заёмного труда в 2016 году, и
          зарубежную практику. Сегодня в России описанный вывод действующих сотрудников за штат, как правило,
          недопустим — подробнее в разделе о праве.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Аутстаффинг</p>
          <h3 className="mt-3 font-display text-2xl italic text-white">Какие были мотивы</h3>
          <ul className="mt-5 space-y-3">
            {MOTIVES.map((m) => (
              <li key={m} className="flex gap-3 text-sm leading-relaxed text-white/70">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8a04a]" />
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/40">
            Для самих работников такая схема была непростой: их приходилось убеждать, что быть в штате агентства
            выгодно. А в российском законодательстве услуга с названием «аутстаффинг» никогда не была отдельно
            урегулирована.
          </p>
        </Reveal>

        <Reveal delay={80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Аутстаффинг</p>
          <h3 className="mt-3 font-display text-2xl italic text-white">Как строилась схема</h3>
          <ol className="mt-5 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-4 text-sm leading-relaxed text-white/70">
                <span className="font-display text-lg italic text-[#e8a04a]">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-xl italic text-white">Что входило в услугу провайдера</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <span key={s} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-xl italic text-white">Какие риски заказчики хотели снять</h3>
          <ul className="mt-5 space-y-3">
            {RISKS.map((r) => (
              <li key={r} className="flex gap-3 text-sm text-white/70">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8a04a]" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20 grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <img src={asset('/img/04.jpg')} alt="Офисный ассистент" loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
            Кадры и зарплата у подрядчика
          </span>
        </Reveal>
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Аутсорсинг</p>
          <h3 className="mt-3 text-3xl font-light tracking-[-0.02em] text-white md:text-4xl">
            Пример: <span className="font-display italic text-[#e8a04a]">кадры и зарплата</span> у подрядчика
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            В HR-сфере компания покупает у подрядчика услугу, а не труд конкретных работников. Модель рассчитана на
            долгосрочные отношения и общий стратегический интерес сторон.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4">
        {OUTSOURCING_ROWS.map((r, i) => (
          <Reveal
            key={r.what}
            delay={i * 60}
            className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:gap-10"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Что передаётся</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{r.what}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8a04a]">Что получает компания</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{r.gain}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
