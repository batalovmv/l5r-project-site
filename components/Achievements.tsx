'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function Achievements() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const stats = [
    {
      value: '44',
      label: t('Сервисов', 'Services'),
      sub: t('Мобильное приложение', 'Mobile app'),
      hint: t('Вся бизнес-логика оффлайн', 'All business logic offline'),
    },
    {
      value: '55',
      label: t('Миграций', 'Migrations'),
      sub: 'Prisma ORM',
      hint: t('Схема БД эволюционировала с проектом', 'DB schema evolved with the project'),
    },
    {
      value: '7',
      label: t('Репозиториев', 'Repositories'),
      sub: 'SQLite',
      hint: t('Data access layer для оффлайн данных', 'Data access layer for offline data'),
    },
    {
      value: '6',
      label: t('Stores', 'Stores'),
      sub: 'Zustand',
      hint: t('Reactive state management', 'Reactive state management'),
    },
  ]

  const features: Array<{ icon: string; color: string; title: string; items: string[]; brand?: boolean }> = [
    {
      icon: 'fa-database',
      color: 'bg-blue-600',
      title: t('Оффлайн хранение', 'Offline storage'),
      items: [
        'SQLite (expo-sqlite)',
        t('Zustand state management', 'Zustand state management'),
        t('Локальный экспорт/импорт', 'Local export/import'),
        t('Данные только на устройстве', 'Data only on device'),
      ],
    },
    {
      icon: 'fa-khanda',
      color: 'bg-success',
      title: t('Боевая система', 'Combat system'),
      items: [
        t('Дуэли с фазами', 'Duels with phases'),
        t('Интриги', 'Intrigues'),
        t('Массовые сражения', 'Mass battles'),
        t('Критические ранения', 'Critical injuries'),
      ],
    },
    {
      icon: 'fa-wand-sparkles',
      color: 'bg-pink-600',
      title: t('Генераторы', 'Generators'),
      items: [
        t('Генератор NPC + скейлинг', 'NPC generator + scaling'),
        t('Генератор имён', 'Name generator'),
        t('Encounter builder', 'Encounter builder'),
        t('Случайные события', 'Random events'),
      ],
    },
    {
      icon: 'fa-dice',
      color: 'bg-l5r-gold',
      title: t('Dice Roller', 'Dice Roller'),
      items: [
        t('Кольцо + навык', 'Ring + skill'),
        t('Explosions', 'Explosions'),
        t('Opportunities', 'Opportunities'),
        t('Визуализация результатов', 'Results visualization'),
      ],
    },
    {
      icon: 'fa-book',
      color: 'bg-cyan-500',
      title: t('Справочники L5R', 'L5R Reference'),
      items: [
        t('5 книг данных', '5 books of data'),
        t('Техники, предметы, качества', 'Techniques, items, qualities'),
        t('7 великих кланов', '7 great clans'),
        t('Локальный поиск', 'Local search'),
      ],
    },
    {
      icon: 'fa-code',
      color: 'bg-gray-700',
      title: t('Архитектура', 'Architecture'),
      items: [
        t('Монорепо: backend + mobile', 'Monorepo: backend + mobile'),
        'React Native (Expo 54)',
        'TypeScript 5.9',
        t('Zod валидация', 'Zod validation'),
      ],
    },
  ]

  return (
    <section id="achievements" className="py-16 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="section-title mb-0">{t('Достижения (что уже сделано)', 'Achievements (done so far)')}</h3>
            <SectionLinkButton targetId="achievements" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
        </div>

        {/* Big Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="achievement-card p-6 text-center" data-reveal data-reveal-delay={String(i * 90)}>
              <div className="text-5xl font-bold text-l5r-gold mb-2">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-wider">{stat.label}</div>
              <p className="text-xs text-gray-500 mt-2">{stat.sub}</p>
              <p className="hint-text">{stat.hint}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="card p-6" data-reveal data-reveal-delay={String((i % 3) * 90)}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${feature.color} rounded-full flex items-center justify-center`}>
                  <i className={`${feature.brand ? 'fa-brands' : 'fa-solid'} ${feature.icon} text-white`}></i>
                </div>
                <h4 className="font-header font-bold text-lg">{feature.title}</h4>
              </div>
              <ul className="space-y-2 text-sm text-ink-light">
                {feature.items.map((item, j) => (
                  <li key={j}>
                    <i className="fa-solid fa-check text-success mr-2"></i>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
