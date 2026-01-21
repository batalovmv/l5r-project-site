'use client'

import Link from 'next/link'
import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'
import Notice from '@/components/Notice'

const PUBLIC_DOC_LINKS = [
  {
    icon: 'fa-sitemap',
    title: { ru: 'Архитектура', en: 'Architecture' },
    desc: {
      ru: 'Модули, оффлайн‑ядро и ключевые решения (без инфраструктурных деталей).',
      en: 'Modules, offline core, and key decisions (without infra details).',
    },
    href: '/docs/architecture/',
  },
  {
    icon: 'fa-database',
    title: { ru: 'Данные и хранение', en: 'Data & storage' },
    desc: {
      ru: 'Локальная модель данных, форматы и версияция — на уровне “как устроено”.',
      en: 'Local data model, formats, and versioning — a how-it-works overview.',
    },
    href: '/docs/api/',
  },
  {
    icon: 'fa-shield-halved',
    title: { ru: 'Приватность', en: 'Privacy' },
    desc: {
      ru: 'Как данные остаются на устройстве и не уходят в сеть.',
      en: 'How data stays on the device and never leaves it.',
    },
    href: '/docs/security/',
  },
  {
    icon: 'fa-gears',
    title: { ru: 'Экспорт и перенос', en: 'Export & portability' },
    desc: {
      ru: 'PDF/JSON экспорт, перенос на новое устройство и резервные копии.',
      en: 'PDF/JSON export, device transfer, and backups.',
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
                'Короткая документация проекта: архитектура, данные, приватность и перенос.',
                'Short project docs: architecture, data, privacy, and portability.'
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

          <div className="mt-8" data-reveal data-reveal-delay="180">
            <Notice compact variant="info" icon="fa-circle-info">
              <div className="text-xs font-code text-gray-600">
                {t('Здесь только публичный обзор — без инфраструктурных деталей и секретов.', 'Public overview only — no infrastructure details or secrets.')}
              </div>
            </Notice>
          </div>
        </div>
      </div>
    </section>
  )
}
