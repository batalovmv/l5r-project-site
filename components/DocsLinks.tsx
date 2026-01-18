'use client'

import Link from 'next/link'
import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL } from '@/lib/links'

const PUBLIC_DOC_LINKS = [
  {
    icon: 'fa-sitemap',
    title: { ru: 'Архитектура', en: 'Architecture' },
    desc: {
      ru: 'Слои, границы, realtime и ключевые решения (без инфраструктурных деталей).',
      en: 'Layers, boundaries, realtime, and key decisions (without infra details).',
    },
    href: '/docs/architecture/',
  },
  {
    icon: 'fa-book',
    title: { ru: 'API обзор', en: 'API overview' },
    desc: {
      ru: 'Группы эндпоинтов, auth, realtime и модель ошибок — на уровне “как пользоваться”.',
      en: 'Endpoint groups, auth, realtime, and error model — usage-level overview.',
    },
    href: '/docs/api/',
  },
  {
    icon: 'fa-shield-halved',
    title: { ru: 'Security', en: 'Security' },
    desc: {
      ru: 'Подходы: валидация, rate limit, idempotency, логирование — без секретов и адресов.',
      en: 'Approaches: validation, rate limiting, idempotency, logging — no secrets/hosts.',
    },
    href: '/docs/security/',
  },
  {
    icon: 'fa-gears',
    title: { ru: 'Ops (lite)', en: 'Ops (lite)' },
    desc: {
      ru: 'Как деплоится/наблюдается в целом, без конкретных хостов и ключей.',
      en: 'How it’s deployed/observed at a high level, without hosts/keys.',
    },
    href: '/docs/ops/',
  },
] as const

export default function DocsLinks() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section id="docs" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">{t('Публичная документация', 'Public documentation')}</h3>
              <SectionLinkButton targetId="docs" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t(
                'Backend репозиторий приватный, поэтому публичные доки размещены прямо здесь.',
                'The backend repo is private, so public docs are hosted here.'
              )}
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              {t(
                'Нужно больше деталей (полный контракт, runbook, changelog) — запросите доступ.',
                'Need more details (full contract, runbook, changelog) — request access.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PUBLIC_DOC_LINKS.map((doc, i) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="card p-6 group hover:-translate-y-1 hover:shadow-xl"
                data-reveal
                data-reveal-delay={String(i * 90)}
              >
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
                <span className="font-bold">{t('Доступ к приватным докам:', 'Private docs access:')}</span>{' '}
                {t('выдаётся по запросу (read-only).', 'granted on request (read-only).')}
              </div>
              <a
                href={ACCESS_REQUEST_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
              >
                <i className="fa-solid fa-lock"></i>
                {t('Запросить доступ', 'Request access')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
