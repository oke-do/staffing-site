import { Reveal, Section, SectionHead } from './ui'

interface Source {
  title: string
  publisher: string
  url?: string
  used: string
}

const GROUPS: { name: string; items: Source[] }[] = [
  {
    name: 'Законодательство Российской Федерации',
    items: [
      {
        title: 'Трудовой кодекс РФ, ст. 56.1 «Запрещение заёмного труда»',
        publisher: 'ГАРАНТ',
        url: 'https://base.garant.ru/12125268/0b0667b2d7e15ace74d1be83268b251e/',
        used: 'определение заёмного труда и запрет',
      },
      {
        title: 'Федеральный закон от 05.05.2014 № 116-ФЗ «О внесении изменений в отдельные законодательные акты Российской Федерации»',
        publisher: 'Правовая база Pravo.ppt.ru',
        url: 'https://pravo.ppt.ru/fz/116-fz-89050',
        used: 'введение запрета с 1 января 2016 года, глава 53.1 ТК РФ',
      },
      {
        title: 'Федеральный закон от 26.12.2024 № 498-ФЗ (изменения в Трудовой кодекс РФ о предоставлении труда работников)',
        publisher: 'ГАРАНТ',
        url: 'https://www.garant.ru/products/ipo/prime/doc/411109201/',
        used: 'новые условия и ограничения предоставления персонала',
      },
      {
        title: 'Федеральный закон от 26.12.2024 № 498-ФЗ — текст закона',
        publisher: 'Правовая база Pravo.ppt.ru',
        url: 'https://pravo.ppt.ru/fz/498-fz-307621',
        used: 'срок до 18 месяцев, порог 10% численности, запреты, равные условия',
      },
      {
        title: 'Закон РФ от 19.04.1991 № 1032-1 «О занятости населения в Российской Федерации», ст. 18.1',
        publisher: 'КонсультантПлюс',
        url: 'https://www.consultant.ru/document/cons_doc_LAW_40483/',
        used: 'аккредитация частных агентств занятости',
      },
      {
        title: 'Трудовой кодекс РФ (ст. 19.1, ст. 59, глава 53.1)',
        publisher: 'КонсультантПлюс',
        url: 'https://www.consultant.ru/document/cons_doc_LAW_34683/',
        used: 'признание отношений трудовыми, срочные трудовые договоры',
      },
      {
        title: 'Налоговый кодекс РФ, ст. 54.1 «Пределы осуществления прав по исчислению налоговой базы»',
        publisher: 'КонсультантПлюс (подборка материалов)',
        url: 'https://www.consultant.ru/law/podborki/statya_54.1_nalogovogo/',
        used: 'налоговые риски фиктивных схем',
      },
      {
        title: 'Кодекс РФ об административных правонарушениях, ст. 5.27',
        publisher: 'КонсультантПлюс',
        url: 'https://www.consultant.ru/document/cons_doc_LAW_34661/',
        used: 'ответственность за нарушение трудового законодательства',
      },
    ],
  },
  {
    name: 'Практика надзора',
    items: [
      {
        title:
          'Доклад о правоприменительной практике при федеральном государственном контроле (надзоре) за выполнением частными агентствами занятости требований аккредитации за 2021 год',
        publisher: 'Федеральная служба по труду и занятости (Роструд)',
        url: 'https://rostrud.gov.ru/upload/iblock/0ed/proekt_doklad-o-pravoprimenitelnoy-praktike-kontrol-chaz-_-itog.docx',
        used: 'требования к аккредитованным агентствам',
      },
    ],
  },
  {
    name: 'Международный опыт',
    items: [
      {
        title: 'Directive 2008/104/EC of the European Parliament and of the Council on temporary agency work',
        publisher: 'EUR-Lex, Европейский союз',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32008L0104',
        used: 'принцип равного обращения с агентскими работниками',
      },
      {
        title: 'Equal treatment of temporary agency workers (summary of the Directive)',
        publisher: 'EUR-Lex, Европейский союз',
        url: 'https://eur-lex.europa.eu/summary/EN/c11329',
        used: 'краткое изложение положений директивы',
      },
      {
        title: 'C181 — Private Employment Agencies Convention, 1997 (No. 181)',
        publisher: 'Международная организация труда (МОТ), NORMLEX',
        url: 'https://normlex.ilo.org/dyn/nrmlx_en/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C181',
        used: 'роль частных агентств занятости и защита работников',
      },
    ],
  },
  {
    name: 'Учебные материалы',
    items: [
      {
        title:
          'Учебные и практические материалы: разделы об аутстаффинге, аутсорсинге в HR-сфере, правовых аспектах найма и практические ситуации с расчётом стоимости персонала',
        publisher: 'Предоставлены автором работы; рекламные фрагменты исключены',
        used: 'мотивы и схема аутстаффинга, пример HR-аутсорсинга, ситуации склада, расчёт стоимости, критерии выбора подрядчика',
      },
    ],
  },
]

export default function Sources() {
  return (
    <Section id="sources">
      <SectionHead
        kicker="Использованные источники"
        plain="На что"
        accent="опирается работа"
        lead="Нормативные акты, документы регулятора, международные акты и учебные материалы."
      />

      <div className="mt-14 space-y-12">
        {GROUPS.map((g) => (
          <Reveal key={g.name}>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40">{g.name}</h3>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {g.items.map((s) => (
                <li key={s.title} className="grid gap-2 py-5 md:grid-cols-[1.6fr_1fr] md:gap-10">
                  <div>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm leading-relaxed text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#e8a04a] hover:decoration-[#e8a04a]"
                      >
                        {s.title}
                      </a>
                    ) : (
                      <p className="text-sm leading-relaxed text-white">{s.title}</p>
                    )}
                    <p className="mt-1 text-xs text-white/45">{s.publisher}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-white/50">
                    <span className="text-white/30">Использовано для: </span>
                    {s.used}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <p className="max-w-3xl text-xs leading-relaxed text-white/40">
          Нормы приведены по указанным источникам по состоянию на октябрь 2026 года. Законодательство меняется, а споры
          о квалификации отношений решаются по обстоятельствам конкретного дела, поэтому перед заключением договора
          сверьтесь с актуальной редакцией и проконсультируйтесь с юристом.
        </p>
      </Reveal>
    </Section>
  )
}
