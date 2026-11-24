import { SectionHead, useInView } from './ui'
import { asset } from '../asset'

interface Card {
  img: string
  role: string
  area: string
  text: string
  tag: string
}

const CARDS: Card[] = [
  {
    img: asset('/img/09.jpg'),
    role: 'Бортпроводник',
    area: 'Транспорт и сервис',
    text: 'Сменный график и сезонные пики делают гибкий состав привлекательным. Допустимый способ зависит от того, кто работодатель и кто управляет работой.',
    tag: 'Выбор модели',
  },
  {
    img: asset('/img/01.jpg'),
    role: 'Мастер красоты',
    area: 'Услуги',
    text: 'Мастеров нередко оформляют по гражданско-правовым договорам. Если человек встроен в график и подчиняется администратору, суд может увидеть трудовые отношения (ст. 19.1 ТК РФ).',
    tag: 'Риск переквалификации',
  },
  {
    img: asset('/img/02.jpg'),
    role: 'Рабочий производства',
    area: 'Производство и склад',
    text: 'Погрузку, упаковку и уборку передают подрядчику целиком, а на сезонный пик набирают людей по срочным договорам.',
    tag: 'Аутсорсинг',
  },
  {
    img: asset('/img/03.jpg'),
    role: 'Повар',
    area: 'Общепит',
    text: 'Организацию питания сотрудников компании часто отдают специализированному подрядчику: он сам отвечает за персонал и результат.',
    tag: 'Аутсорсинг',
  },
  {
    img: asset('/img/04.jpg'),
    role: 'Офисный ассистент',
    area: 'Офис и кадры',
    text: 'Кадровый учёт, расчёт зарплаты и отчётность — типичные функции, которые передают внешнему исполнителю.',
    tag: 'Аутсорсинг',
  },
  {
    img: asset('/img/05.jpg'),
    role: 'Преподаватель',
    area: 'Образование',
    text: 'Временную замену отсутствующего работника оформляют срочным трудовым договором на время его отсутствия (ст. 59 ТК РФ).',
    tag: 'Срочный договор',
  },
  {
    img: asset('/img/06.jpg'),
    role: 'Клинер',
    area: 'Клининг',
    text: 'Уборка — классический пример непрофильной функции: заказчик принимает результат, а людей подбирает и ведёт подрядчик.',
    tag: 'Аутсорсинг',
  },
  {
    img: asset('/img/07.jpg'),
    role: 'Администратор зала',
    area: 'Гостеприимство',
    text: 'Пиковые вечера и праздники закрывают временные работники. Важно, на каком законном основании они привлечены.',
    tag: 'Временный персонал',
  },
  {
    img: asset('/img/08.jpg'),
    role: 'Бариста',
    area: 'Кофейни и ритейл',
    text: 'Сезонные пики и подмены требуют гибкости, но схема должна быть законной — без «вывода за штат».',
    tag: 'Срочный договор',
  },
]

function CardView({ c, i, seen, dup }: { c: Card; i: number; seen: boolean; dup?: boolean }) {
  return (
    <article
      aria-hidden={dup || undefined}
      className={`reveal-x group w-[260px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:w-[300px] ${
        seen ? 'is-in' : ''
      }`}
      style={{ transitionDelay: dup ? undefined : `${i * 90}ms` }}
    >
      <div className="relative h-[290px] overflow-hidden md:h-[340px]">
        <img
          src={c.img}
          alt={dup ? '' : c.role}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
          {c.area}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl italic text-white">{c.role}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-white/65">{c.text}</p>
        <span className="mt-4 inline-block rounded-full border border-[#e8a04a]/40 bg-[#e8a04a]/10 px-3 py-1 text-xs text-[#f0b46a]">
          {c.tag}
        </span>
      </div>
    </article>
  )
}

export default function Carousel() {
  const [viewRef, seen] = useInView<HTMLDivElement>(0.12)

  return (
    <section id="professions" className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHead
          kicker="Кого это касается"
          plain="Профессии, где это"
          accent="встречается"
          lead="Модели привлечения персонала используют в самых разных сферах — от склада до образования."
        />
      </div>

      <div ref={viewRef} className="marquee mt-14 overflow-hidden">
        <div className="marquee-track flex w-max">
          <div className="flex shrink-0 gap-5 pr-5">
            {CARDS.map((c, i) => (
              <CardView key={c.img} c={c} i={i} seen={seen} />
            ))}
          </div>
          <div className="flex shrink-0 gap-5 pr-5" aria-hidden>
            {CARDS.map((c, i) => (
              <CardView key={c.img} c={c} i={i} seen={seen} dup />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-6xl px-6 text-xs text-white/35 md:px-10">
          Иллюстративные фотографии: примеры показывают типичные случаи и не относятся к конкретным компаниям или людям.
        </p>
      </div>
    </section>
  )
}
