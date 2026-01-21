'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

type PhaseStatus = 'done' | 'current' | 'pending'

export default function PlayerRoadmap() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const phases = [
    {
      icon: 'fa-check',
      status: 'done' as PhaseStatus,
      title: t('Движок готов', 'Engine ready'),
      description: t('Вся логика игры реализована', 'All game logic implemented'),
    },
    {
      icon: 'fa-check',
      status: 'done' as PhaseStatus,
      title: t('Мобильное приложение', 'Mobile app'),
      description: t('React Native + SQLite оффлайн архитектура', 'React Native + SQLite offline architecture'),
    },
    {
      icon: 'fa-palette',
      status: 'current' as PhaseStatus,
      title: t('UI/UX дизайн', 'UI/UX design'),
      description: t('Работа над интерфейсом', 'Working on interface'),
    },
    {
      icon: 'fa-rocket',
      status: 'pending' as PhaseStatus,
      title: t('Релиз!', 'Release!'),
      description: t('Публикация в App Store и Google Play', 'Publishing to App Store and Google Play'),
    },
  ]

  const statusStyle = (status: PhaseStatus) => {
    if (status === 'done') return 'bg-success text-white'
    if (status === 'current') return 'bg-l5r-gold text-white'
    return 'bg-gray-200 text-gray-400'
  }

  return (
    <section id="roadmap" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="section-title mb-0">{t('Когда будет готово?', 'When will it be ready?')}</h3>
            <SectionLinkButton targetId="roadmap" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {phases.map((phase, i) => (
            <div key={i} className="card p-6 flex items-start gap-4" data-reveal data-reveal-delay={String(i * 90)}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${statusStyle(phase.status)}`}>
                <i className={`fa-solid ${phase.icon}`}></i>
              </div>
              <div className={phase.status === 'pending' ? 'opacity-60' : ''}>
                <h4 className="font-header font-bold text-lg text-ink">{phase.title}</h4>
                <p className="text-sm text-ink-light">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10" data-reveal data-reveal-delay="120">
          <p className="text-ink-light">
            {t(
              'Хочешь узнать когда выйдет приложение? Следи за обновлениями!',
              'Want to know when the app launches? Stay tuned for updates!'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
