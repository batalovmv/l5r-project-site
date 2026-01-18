export default function Achievements() {
  const stats = [
    { value: '122', label: 'API Operations', sub: 'REST + OpenAPI', hint: 'Контракт, документация и типы генерируются из OpenAPI' },
    { value: '92', label: 'Таблиц БД', sub: 'Prisma ORM', hint: 'Сложная реляционная модель + миграции + seed' },
    { value: '48', label: 'Сервисов', sub: 'Бизнес-логика', hint: 'Сервисы по доменам: auth/campaigns/scenes/xp…' },
    { value: '32', label: 'Миграций', sub: 'Версионирование', hint: 'Схема БД эволюционировала вместе с фичами' },
  ]

  const features = [
    {
      icon: 'fa-shield-halved',
      color: 'bg-l5r-red',
      title: 'Безопасность',
      items: ['JWT + refresh rotation', 'OAuth 2.0 (Google, VK)', 'Rate limiting + Helmet', 'Валидация запросов (Zod/AJV)'],
    },
    {
      icon: 'fa-bolt',
      color: 'bg-tech',
      title: 'Real-time',
      items: ['Server-Sent Events (SSE)', 'Redis Pub/Sub (multi-instance)', 'Reconnection/heartbeat', 'Sync API (cursor + tombstones)'],
    },
    {
      icon: 'fa-swords',
      color: 'bg-success',
      title: 'Боевая система',
      items: ['Дуэли с фазами', 'Интриги', 'Массовые сражения', 'Dice rolls + проверки'],
    },
    {
      icon: 'fa-chart-line',
      color: 'bg-purple-600',
      title: 'Мониторинг',
      items: ['Prometheus /metrics', 'Sentry errors', 'OpenTelemetry traces', 'Structured logs (Pino)'],
    },
    {
      icon: 'fa-docker',
      color: 'bg-orange-500',
      title: 'DevOps',
      items: ['CI: lint/typecheck/tests', 'Docker multi-stage + Compose', 'Feature flags + kill switch', 'Backups + runbook', 'k6 load tests'],
      brand: true,
    },
    {
      icon: 'fa-database',
      color: 'bg-cyan-500',
      title: 'Данные L5R',
      items: ['5 книг справочников', '7 великих кланов + семьи/школы', 'Техники, предметы, качества', 'xlsx → JSON → seed pipeline'],
    },
  ]

  return (
    <section id="achievements" className="py-16 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-reveal>
          <h3 className="section-title mb-2">Достижения (что уже сделано)</h3>
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

