'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function PlayerFeatures() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const features = [
    {
      icon: 'fa-user-ninja',
      color: 'bg-l5r-red',
      title: t('Создай персонажа за 5 минут', 'Create a character in 5 minutes'),
      description: t(
        'Пошаговый мастер "20 вопросов" — выбирай клан, семью, школу. Все бонусы и навыки посчитаются автоматически.',
        'Step-by-step "20 Questions" wizard — choose clan, family, school. All bonuses and skills calculated automatically.'
      ),
    },
    {
      icon: 'fa-mobile-screen',
      color: 'bg-tech',
      title: t('Лист персонажа всегда с собой', 'Character sheet always with you'),
      description: t(
        'Ринги, техники, инвентарь — всё на экране телефона. Никаких бумаг, карандашей и ластиков.',
        'Rings, techniques, inventory — all on your phone. No papers, pencils, or erasers.'
      ),
    },
    {
      icon: 'fa-dice',
      color: 'bg-l5r-gold',
      title: t('Бросай кубики в приложении', 'Roll dice in the app'),
      description: t(
        'Кольцо + навык, explosions, opportunities — всё считается автоматически. Или кидай физические кубики — как хочешь!',
        'Ring + skill, explosions, opportunities — all calculated automatically. Or roll physical dice — your choice!'
      ),
    },
    {
      icon: 'fa-khanda',
      color: 'bg-red-600',
      title: t('Полная боевая система', 'Full combat system'),
      description: t(
        'Дуэли, интриги, массовые сражения — все по правилам книги. Инициатива, стойки, состояния — всё автоматизировано.',
        'Duels, intrigues, mass battles — all by the book. Initiative, stances, conditions — all automated.'
      ),
    },
    {
      icon: 'fa-book-open',
      color: 'bg-amber-600',
      title: t('Справочник под рукой', 'Rulebook at your fingertips'),
      description: t(
        'Все техники, преимущества, оружие — ищи и читай прямо в приложении. 5 книг, работает без интернета.',
        'All techniques, advantages, weapons — search and read right in the app. 5 books, works offline.'
      ),
    },
    {
      icon: 'fa-wifi-slash',
      color: 'bg-gray-700',
      title: t('Работает без интернета', 'Works offline'),
      description: t(
        'Никакого сервера, никаких аккаунтов. Все данные хранятся локально на твоём телефоне.',
        'No server, no accounts. All data is stored locally on your phone.'
      ),
    },
    {
      icon: 'fa-file-pdf',
      color: 'bg-red-700',
      title: t('Экспорт в PDF', 'Export to PDF'),
      description: t(
        'Нужен бумажный лист? Экспортируй персонажа в PDF и распечатай.',
        'Need a paper sheet? Export your character to PDF and print.'
      ),
    },
  ]

  return (
    <section id="features" className="py-20 bg-paper-dark border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="section-title mb-0">{t('Что умеет приложение', 'What the app can do')}</h3>
            <SectionLinkButton targetId="features" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
          <p className="section-subtitle mx-auto">
            {t(
              'Всё что нужно для игры в Legend of the Five Rings 5th Edition — в одном приложении',
              'Everything you need to play Legend of the Five Rings 5th Edition — in one app'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="card p-6" data-reveal data-reveal-delay={String(i * 90)}>
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                <i className={`fa-solid ${feature.icon} text-white text-xl`}></i>
              </div>
              <h4 className="font-header font-bold text-lg mb-2 text-ink">{feature.title}</h4>
              <p className="text-sm text-ink-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
