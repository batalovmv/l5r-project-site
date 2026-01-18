'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL, SITE_REPO_URL } from '@/lib/links'

const DELIVERABLES = {
  ru: [
    {
      icon: 'fa-palette',
      title: 'Дизайн‑система',
      items: ['цвета и типографика', 'сетка/отступы', 'иконки/иллюстрации', 'UI kit компонентов'],
    },
    {
      icon: 'fa-mobile-screen',
      title: 'Ключевые экраны',
      items: ['Home / Campaigns', 'Characters list', 'Character sheet', 'Scene/Combat UI'],
    },
    {
      icon: 'fa-layer-group',
      title: 'Состояния UI',
      items: ['loading/empty/error', 'offline режим', 'role: GM/Player', 'permissions/locked'],
    },
    {
      icon: 'fa-route',
      title: 'UX‑флоу',
      items: ['навигация', 'критические сценарии', 'кликабельный прототип', 'handoff для RN'],
    },
  ],
  en: [
    {
      icon: 'fa-palette',
      title: 'Design system',
      items: ['colors & typography', 'grid/spacing', 'icons/illustrations', 'UI kit components'],
    },
    {
      icon: 'fa-mobile-screen',
      title: 'Key screens',
      items: ['Home / Campaigns', 'Characters list', 'Character sheet', 'Scene/Combat UI'],
    },
    {
      icon: 'fa-layer-group',
      title: 'UI states',
      items: ['loading/empty/error', 'offline mode', 'roles: GM/Player', 'permissions/locked'],
    },
    {
      icon: 'fa-route',
      title: 'UX flow',
      items: ['navigation', 'critical journeys', 'clickable prototype', 'handoff for RN'],
    },
  ],
} as const

export default function DesignBrief() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section id="design" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">{t('Дизайн: brief', 'Design brief')}</h3>
              <SectionLinkButton targetId="design" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t(
                'Сейчас фронтенд не стартовал: он начинается по готовым макетам и дизайн‑системе.',
                'Frontend hasn’t started yet: it begins from ready screens and a design system.'
              )}
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              {t(
                'Продуктовые тестирования/бета — после появления UI и кликабельного прототипа.',
                'Product testing/beta starts after UI and a clickable prototype exist.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DELIVERABLES[locale].map((block, i) => (
              <div key={block.title} className="card p-6" data-reveal data-reveal-delay={String(i * 90)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-l5r-gold/10 border border-l5r-gold/25 flex items-center justify-center">
                    <i className={`fa-solid ${block.icon} text-l5r-gold`}></i>
                  </div>
                  <h4 className="font-header font-bold text-lg text-ink">{block.title}</h4>
                </div>
                <ul className="space-y-2 text-sm text-ink-light">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-check text-success mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 card-soft p-6" data-reveal data-reveal-delay="120">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Цель:', 'Goal:')}</span>{' '}
                {t(
                  'зафиксировать визуальный стиль и UX‑флоу → после этого собрать RN интерфейс быстро и без переделок.',
                  'lock the visual style and UX flow → then build the RN UI fast with minimal rework.'
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={ACCESS_REQUEST_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
                >
                  <i className="fa-solid fa-lock"></i>
                  {t('Доступ к backend', 'Backend access')}
                </a>
                <a
                  href={SITE_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
                >
                  <i className="fa-brands fa-github"></i>
                  {t('Репозиторий сайта', 'Site repo')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
