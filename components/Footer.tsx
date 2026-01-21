'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { SITE_REPO_URL } from '@/lib/links'

export default function Footer() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN)

  const books = ['Core Rulebook', 'Emerald Empire', 'Shadowlands', 'Courts of Stone', 'Path of Waves']

  return (
    <footer id="footer" className="bg-ink py-12 text-center border-t-2 border-l5r-gold/40">
      <div className="container mx-auto px-4">
        <div className="font-header text-2xl font-bold text-white mb-2">Project Rokugan</div>
        <p className="text-gray-400 mb-4">Legend of the Five Rings 5th Edition Digital Companion</p>

        {/* Supported Books */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
            {t('Поддерживаемые книги', 'Supported books')}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {books.map((book, i) => (
              <span key={i} className="px-2 py-1 bg-success/20 text-success text-xs rounded">
                {book}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="flex justify-center gap-4 mb-6 text-sm">
          <span className="text-gray-400">🇷🇺 {t('Русский', 'Russian')}</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">🇬🇧 English</span>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a
            href={SITE_REPO_URL}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label={t('GitHub репозиторий проекта', 'Project GitHub repository')}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        <div className="text-xs text-gray-500 font-code">
          {t(
            'Ядро: оффлайн‑правила и данные | Приложение (planned): React Native + Expo',
            'Core: offline rules and data | App (planned): React Native + Expo'
          )}
        </div>
        <div className="text-xs text-gray-600 mt-2">
          {t('5 книг • 20 вопросов • оффлайн', '5 books • 20 questions • offline')}
        </div>
        {analyticsEnabled ? (
          <div className="text-[11px] text-gray-600 mt-2">
            {t(
              'Аналитика: Cloudflare Web Analytics (минимально, без cookies).',
              'Analytics: Cloudflare Web Analytics (minimal, cookie-free).'
            )}
          </div>
        ) : null}
      </div>
    </footer>
  )
}

