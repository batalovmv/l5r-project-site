import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/#progress', label: 'Прогресс' },
  { href: '/#features', label: 'Функции' },
  { href: '/#achievements', label: 'Достижения' },
  { href: '/#code', label: 'Код' },
  { href: '/#docs', label: 'Доки' },
  { href: '/#roadmap', label: 'План' },
] as const

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="relative py-24 px-4 overflow-hidden flex flex-col items-center text-center border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[18rem] top-0 text-ink select-none">迷</div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-red/10 border border-l5r-red/25 rounded-full text-xs font-code font-bold text-l5r-red mb-6 shadow-sm">
            <i className="fa-solid fa-triangle-exclamation"></i>
            404 • NOT FOUND
          </div>

          <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">
            Страница не найдена
          </h2>
          <p className="font-body text-lg text-ink-light mb-8 max-w-xl mx-auto leading-relaxed">
            Возможно ссылка устарела или раздел был перемещён. Вернитесь на главную и выберите нужный блок.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/" className="btn btn-primary">
              <i className="fa-solid fa-house"></i>На главную
            </Link>
            <a
              href="https://github.com/batalovmv/l5r-project-site"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <i className="fa-brands fa-github"></i>Этот сайт
            </a>
          </div>

          <div className="card-soft p-6">
            <div className="text-sm text-ink">
              Быстрые ссылки по странице:
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full border border-ink/10 bg-white/70 hover:bg-white text-sm font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

