'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL, SITE_REPO_URL } from '@/lib/links'

const DOCS = [
  {
    href: '/docs/architecture/',
    icon: 'fa-sitemap',
    title: { ru: 'Архитектура', en: 'Architecture' },
    desc: {
      ru: 'Слои, границы, realtime и ключевые решения. Без хостов, ключей и секретов.',
      en: 'Layers, boundaries, realtime, and key decisions. No hosts, keys, or secrets.',
    },
  },
  {
    href: '/docs/api/',
    icon: 'fa-book',
    title: { ru: 'API обзор', en: 'API overview' },
    desc: {
      ru: 'Как устроено API на уровне использования: auth, версии, realtime, ошибки.',
      en: 'Usage-level API: auth, versioning, realtime, error model.',
    },
  },
  {
    href: '/docs/security/',
    icon: 'fa-shield-halved',
    title: { ru: 'Security', en: 'Security' },
    desc: {
      ru: 'Подходы безопасности: валидация, ограничения, idempotency, наблюдаемость.',
      en: 'Security approaches: validation, limits, idempotency, observability.',
    },
  },
  {
    href: '/docs/ops/',
    icon: 'fa-gears',
    title: { ru: 'Ops (lite)', en: 'Ops (lite)' },
    desc: {
      ru: 'Высокоуровнево: деплой, health/ready, метрики, трассировка, бэкапы.',
      en: 'High-level: deploy, health/ready, metrics, tracing, backups.',
    },
  },
] as const

export default function DocsIndexPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

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
                'Backend репозиторий приватный — здесь собран безопасный публичный обзор: архитектура, API и подходы.',
                'The backend repository is private — this is a safe public overview: architecture, API, and approaches.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-ink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {DOCS.map((doc, i) => (
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

            <div className="mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-ink">
                  <span className="font-bold">{t('Нужны приватные материалы?', 'Need private materials?')}</span>{' '}
                  {t('Полный контракт, runbook и changelog — по запросу (read-only).', 'Full contract, runbook and changelog — available on request (read-only).')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={ACCESS_REQUEST_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                    <i className="fa-solid fa-lock"></i>
                    {t('Запросить доступ', 'Request access')}
                  </a>
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
