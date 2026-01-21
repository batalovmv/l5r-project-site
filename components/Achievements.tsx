'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function Achievements() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const stats = [
    {
      value: '5',
      label: t('Книг справочника', 'Reference books'),
      sub: 'L5R 5e',
      hint: t('Полные справочники доступны оффлайн', 'Full reference books available offline'),
    },
    {
      value: '20',
      label: t('Вопросов создания', 'Creation questions'),
      sub: t('Мастер персонажа', 'Character wizard'),
      hint: t('Полный путь создания персонажа по книге', 'Complete book-guided character creation flow'),
    },
    {
      value: '5',
      label: t('Типов сцен', 'Scene types'),
      sub: t('Skirmish • Duel • Intrigue', 'Skirmish • Duel • Intrigue'),
      hint: t('Отдельные правила для каждой сцены', 'Distinct rules for each scene'),
    },
    {
      value: '7',
      label: t('Великих кланов', 'Great clans'),
      sub: t('Кланы, семьи, школы', 'Clans, families, schools'),
      hint: t('Полный справочник персонажей', 'Complete character reference'),
    },
  ]

  const features: Array<{ icon: string; color: string; title: string; items: string[]; brand?: boolean }> = [
    {
      icon: 'fa-shield-halved',
      color: 'bg-l5r-red',
      title: t('Приватность', 'Privacy'),
      items: [
        t('Никаких серверов и аккаунтов', 'No servers or accounts'),
        t('Локальное хранение данных', 'Local data storage'),
        t('Работа без интернета', 'Works without internet'),
        t('Полный контроль у игрока', 'Full control stays with the player'),
      ],
    },
    {
      icon: 'fa-khanda',
      color: 'bg-success',
      title: t('Боевая система', 'Combat system'),
      items: [t('Дуэли с фазами', 'Duels with phases'), t('Интриги', 'Intrigues'), t('Массовые сражения', 'Mass battles'), t('Карты сцен + токены', 'Scene maps + tokens')],
    },
    {
      icon: 'fa-scroll',
      color: 'bg-amber-600',
      title: t('Создание персонажа', 'Character creation'),
      items: [
        t('Мастер "20 вопросов"', '20 Questions wizard'),
        t('Автоподсчёт бонусов', 'Automatic bonus calculation'),
        t('Кланы, семьи, школы', 'Clans, families, schools'),
        t('Быстрый старт персонажа', 'Fast character setup'),
      ],
    },
    {
      icon: 'fa-database',
      color: 'bg-cyan-500',
      title: t('Данные L5R', 'L5R data'),
      items: [
        t('5 книг справочников', '5 reference books'),
        t('7 великих кланов + семьи/школы', '7 great clans + families/schools'),
        t('Техники, предметы, качества', 'Techniques, items, qualities'),
        'xlsx → JSON → seed pipeline',
      ],
    },
    {
      icon: 'fa-dice',
      color: 'bg-pink-600',
      title: t('Кубики и проверки', 'Dice & checks'),
      items: [
        t('Кольцо + навык', 'Ring + skill'),
        t('Автоподсчёт успехов', 'Automatic success tally'),
        t('Взрывы и возможности', 'Explosions and opportunities'),
        t('Физические кубики — опционально', 'Physical dice are optional'),
      ],
    },
    {
      icon: 'fa-file-export',
      color: 'bg-purple-600',
      title: t('Экспорт и перенос', 'Export & portability'),
      items: [
        t('PDF лист персонажа', 'Character sheet PDF'),
        t('JSON для переноса', 'JSON for transfer'),
        t('Файлы остаются у вас', 'Files stay with you'),
        t('Удобно для печати', 'Print-friendly'),
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
