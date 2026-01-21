'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

const QA = [
  {
    q: { ru: 'Что это за сайт?', en: 'What is this site?' },
    a: {
      ru: 'Project hub: коротко и по делу показывает прогресс, ключевые возможности и публичные доки проекта.',
      en: 'A project hub: a concise overview of progress, key features, and public project docs.',
    },
  },
  {
    q: { ru: 'Что уже реально готово?', en: 'What is actually ready?' },
    a: {
      ru: 'Сейчас готово ядро правил и данные. Фронтенд начнётся после дизайна.',
      en: 'The rules core and data are ready. Frontend starts after the design is ready.',
    },
  },
  {
    q: { ru: 'Почему нет скриншотов интерфейса?', en: 'Why no UI screenshots yet?' },
    a: {
      ru: 'Потому что UI ещё не стартовал: жду дизайн. Вместо скриншотов есть витрина кода и описание функциональности.',
      en: 'UI hasn’t started yet: waiting for design. Instead, there’s a code walkthrough and feature overview.',
    },
  },
  {
    q: { ru: 'Где смотреть детали?', en: 'Where to find details?' },
    a: {
      ru: 'В секции “ДОКИ” — архитектура, локальные данные, приватность и перенос (публично, без секретов).',
      en: 'In “DOCS” — architecture, local data, privacy, and portability (public, no secrets).',
    },
  },
] as const

export default function MiniFAQ() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section id="faq" className="py-16 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">{t('FAQ', 'FAQ')}</h3>
              <SectionLinkButton targetId="faq" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t('Короткие ответы, чтобы не терять контекст проекта.', 'Short answers to keep project context clear.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {QA.map((item, i) => (
              <div key={item.q.en} className="card p-6" data-reveal data-reveal-delay={String(i * 90)}>
                <div className="font-header font-bold text-lg text-ink mb-2">{item.q[locale]}</div>
                <div className="text-sm text-ink-light leading-relaxed">{item.a[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
