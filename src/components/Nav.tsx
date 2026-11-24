const LINKS: { label: string; href: string }[] = [
  { label: 'Модели', href: '#models' },
  { label: 'Сравнение', href: '#compare' },
  { label: 'Ситуации', href: '#scenarios' },
  { label: 'Право', href: '#law' },
  { label: 'Проблемы', href: '#problems' },
  { label: 'Источники', href: '#sources' },
]

/** Floating pill menu (desktop only). No logo, no button, no background bar. */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-100 hidden justify-center px-6 pt-5 md:flex">
      <nav className="pointer-events-auto flex items-center rounded-full border border-white/20 bg-black/40 px-2 py-2 backdrop-blur-md">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
