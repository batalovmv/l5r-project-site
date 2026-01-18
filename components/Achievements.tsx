'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function Achievements() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const stats = [
    {
      value: '122',
      label: t('API операции', 'API operations'),
      sub: 'REST + OpenAPI',
      hint: t('Контракт, документация и типы генерируются из OpenAPI', 'Contract, docs, and types are generated from OpenAPI'),
    },
    {
      value: '92',
      label: t('Таблиц БД', 'DB tables'),
      sub: 'Prisma ORM',
      hint: t('Сложная реляционная модель + миграции + seed', 'Complex relational model + migrations + seed'),
    },
    {
      value: '48',
      label: t('Сервисов', 'Services'),
      sub: t('Бизнес-логика', 'Business logic'),
      hint: t('Сервисы по доменам: auth/campaigns/scenes/xp…', 'Domain services: auth/campaigns/scenes/xp…'),
    },
    {
      value: '32',
      label: t('Миграций', 'Migrations'),
      sub: t('Версионирование', 'Versioning'),
      hint: t('Схема БД эволюционировала вместе с фичами', 'The DB schema evolved alongside features'),
    },
  ]

  const features = [
    {
      icon: 'fa-shield-halved',
      color: 'bg-l5r-red',
      title: t('Безопасность', 'Security'),
      items: [
        'JWT + refresh rotation',
        t('OAuth 2.0 (Google, VK)', 'OAuth 2.0 (Google, VK)'),
        'Rate limiting + Helmet',
        t('Валидация запросов (Zod/AJV)', 'Request validation (Zod/AJV)'),
      ],
    },
    {
      icon: 'fa-bolt',
      color: 'bg-tech',
      title: t('Real-time', 'Real-time'),
      items: ['Server-Sent Events (SSE)', 'Redis Pub/Sub (multi-instance)', 'Reconnection/heartbeat', 'Sync API (cursor + tombstones)'],
    },
    {
      icon: 'fa-khanda',
      color: 'bg-success',
      title: t('Боевая система', 'Combat system'),
      items: [t('Дуэли с фазами', 'Duels with phases'), t('Интриги', 'Intrigues'), t('Массовые сражения', 'Mass battles'), t('Dice rolls + проверки', 'Dice rolls + checks')],
    },
    {
      icon: 'fa-chart-line',
      color: 'bg-purple-600',
      title: t('Мониторинг', 'Observability'),
      items: ['Prometheus /metrics', 'Sentry errors', 'OpenTelemetry traces', 'Structured logs (Pino)'],
    },
    {
      icon: 'fa-docker',
      color: 'bg-orange-500',
      title: 'DevOps',
      items: [
        'CI: lint/typecheck/tests',
        'Docker multi-stage + Compose',
        'Feature flags + kill switch',
        t('Backups + runbook', 'Backups + runbook'),
        'k6 load tests',
      ],
      brand: true,
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

