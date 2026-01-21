'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import { SITE_REPO_URL } from '@/lib/links'
import Notice from '@/components/Notice'

const DOCS = [
  {
    href: '/docs/architecture/',
    icon: 'fa-sitemap',
    title: { ru: 'Архитектура', en: 'Architecture' },
    desc: {
      ru: 'Модули, оффлайн‑ядро и ключевые решения. Без хостов, ключей и секретов.',
      en: 'Modules, offline core, and key decisions. No hosts, keys, or secrets.',
    },
  },
  {
    href: '/docs/api/',
    icon: 'fa-database',
    title: { ru: 'Данные и хранение', en: 'Data & storage' },
    desc: {
      ru: 'Локальная модель данных, форматы и версияция.',
      en: 'Local data model, formats, and versioning.',
    },
  },
  {
    href: '/docs/security/',
    icon: 'fa-shield-halved',
    title: { ru: 'Приватность', en: 'Privacy' },
    desc: {
      ru: 'Как данные остаются на устройстве и не уходят в сеть.',
      en: 'How data stays on the device and never leaves it.',
    },
  },
  {
    href: '/docs/ops/',
    icon: 'fa-gears',
    title: { ru: 'Экспорт и перенос', en: 'Export & portability' },
    desc: {
      ru: 'PDF/JSON экспорт, перенос на новое устройство и резервные копии.',
      en: 'PDF/JSON export, device transfer, and backups.',
    },
  },
] as const

export default function DocsIndexPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DOCS
    return DOCS.filter((d) => {
      const title = d.title[locale].toLowerCase()
      const desc = d.desc[locale].toLowerCase()
      return title.includes(q) || desc.includes(q)
    })
  }, [locale, query])

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">書</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-red/10 border border-l5r-red/25 rounded-full text-xs font-code font-bold text-l5r-red mb-6 shadow-sm">
              <i className="fa-solid fa-book"></i>
              {t('ПУБЛИЧНЫЕ ДОКИ', 'PUBLIC DOCS')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Документация проекта', 'Project documentation')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Публичный обзор: архитектура, данные, приватность и перенос.',
                'Public overview: architecture, data, privacy, and portability.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-ink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl mx-auto mb-10" data-reveal>
              <div className="card-soft p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/70 border border-ink/10 flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('Поиск по публичным докам…', 'Search public docs…')}
                    className="w-full bg-transparent outline-none font-bold text-ink placeholder:text-gray-500"
                    aria-label={t('Поиск по документации', 'Search documentation')}
                  />
                  {query.trim() ? (
                    <button
                      type="button"
                      className="px-3 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 text-sm font-bold"
                      onClick={() => setQuery('')}
                    >
                      {t('Очистить', 'Clear')}
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <Notice compact variant="info" icon="fa-lock" className="max-w-xl mx-auto">
                  <div className="text-xs font-code text-gray-600">
                    {t(
                      'Безопасность: без хостов, ключей и секретов.',
                      'Security: no hosts, keys, or secrets.'
                    )}
                  </div>
                </Notice>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((doc, i) => (
                <Link key={doc.href} href={doc.href} className="card p-6 group hover:-translate-y-1 hover:shadow-xl" data-reveal data-reveal-delay={String(i * 90)}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-l5r-red/10 border border-l5r-red/20 flex items-center justify-center flex-shrink-0">
                      <i className={`fa-solid ${doc.icon} text-l5r-red`}></i>
                    </div>
                    <div className="min-w-0">
                      <div className="font-header font-bold tracking-widest text-ink group-hover:text-l5r-red">{doc.title[locale]}</div>
                      <div className="text-sm text-ink-light mt-1 leading-relaxed">{doc.desc[locale]}</div>
                      <div className="text-xs font-code text-gray-500 mt-3">
                        <i className="fa-solid fa-arrow-right mr-2"></i>
                        {t('Открыть', 'Open')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 text-center" data-reveal data-reveal-delay="120">
                <div className="card-soft p-6 max-w-2xl mx-auto">
                  <div className="font-header font-bold text-lg text-ink">{t('Ничего не найдено', 'No results')}</div>
                  <div className="text-sm text-ink-light mt-2">
                    {t('Попробуйте другой запрос или откройте оглавление без фильтра.', 'Try another query or clear the filter.')}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-ink">
                  <span className="font-bold">{t('Исходники сайта:', 'Site sources:')}</span>{' '}
                  {t('этот репозиторий содержит только project hub.', 'this repository contains the project hub only.')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={SITE_REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                    <i className="fa-brands fa-github"></i>
                    {t('Репозиторий сайта', 'Site repo')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
