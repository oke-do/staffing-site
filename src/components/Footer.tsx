import { AUTHOR, TOPIC_MAIN, TOPIC_SUB } from './HeadHero'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.4fr_1fr] md:px-10">
        <div>
          <p className="font-display text-2xl italic text-white">
            {TOPIC_MAIN.replace(':', '')} <span className="text-[#e8a04a]">·</span> {TOPIC_SUB}
          </p>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/40">
            Материал носит справочный характер и не является юридической консультацией.
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Автор</p>
          <p className="mt-2 font-display text-xl italic text-white">{AUTHOR.name}</p>
          <p className="mt-1 text-xs text-white/50">группа {AUTHOR.group}</p>
        </div>
      </div>
    </footer>
  )
}
