'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'

const QUICK_LINKS: Record<'ru' | 'en', Array<{ href: string; label: string }>> = {
  ru: [
    { href: '/#progress', label: 'Прогресс' },
    { href: '/#features', label: 'Функции' },
    { href: '/#achievements', label: 'Сделано' },
    { href: '/#code', label: 'Фрагменты кода' },
    { href: '/#docs', label: 'Документация' },
    { href: '/#roadmap', label: 'План' },
  ],
  en: [
    { href: '/#progress', label: 'Progress' },
    { href: '/#features', label: 'Features' },
    { href: '/#achievements', label: 'Done' },
    { href: '/#code', label: 'Code snippets' },
    { href: '/#docs', label: 'Docs' },
    { href: '/#roadmap', label: 'Roadmap' },
  ],
}

export default function NotFound() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <section className="hero-surface relative py-24 px-4 overflow-hidden flex flex-col items-center text-center border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[18rem] top-0 text-ink select-none">迷</div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-red/10 border border-l5r-red/25 rounded-full text-xs font-code font-bold text-l5r-red mb-6 shadow-sm">
            <i className="fa-solid fa-triangle-exclamation"></i>
            404 • NOT FOUND
          </div>

          <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">
            {t('Страница не найдена', 'Page not found')}
          </h2>
          <p className="font-body text-lg text-ink-light mb-8 max-w-xl mx-auto leading-relaxed">
            {t(
              'Возможно ссылка устарела или раздел был перемещён. Вернитесь на главную и выберите нужный блок.',
              'The link may be outdated or the section has moved. Go back home and pick the section you need.'
            )}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/" className="btn btn-primary">
              <i className="fa-solid fa-house"></i>
              {t('На главную', 'Back home')}
            </Link>
            <a
              href="https://github.com/batalovmv/l5r-project-site"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <i className="fa-brands fa-github"></i>
              {t('Этот сайт', 'This site')}
            </a>
          </div>

          <div className="card-soft p-6">
            <div className="text-sm text-ink">
              {t('Быстрые ссылки по странице:', 'Quick links:')}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {QUICK_LINKS[locale].map((link) => (
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
