export default function Achievements() {
  const stats = [
    { value: '81', label: 'API Endpoints', sub: 'REST + OpenAPI', hint: 'Документация + валидация + типизация ответов' },
    { value: '92', label: 'Таблиц БД', sub: 'Prisma ORM', hint: 'Сложная реляционная модель + миграции + seed' },
    { value: '38', label: 'Сервисов', sub: 'Бизнес-логика', hint: 'Сервисы по доменам: auth/campaigns/scenes/xp…' },
    { value: '30+', label: 'Миграций', sub: 'Версионирование', hint: 'Схема БД эволюционировала вместе с фичами' },
  ]

  const features = [
    {
      icon: 'fa-shield-halved',
      color: 'bg-l5r-red',
      title: 'Аутентификация',
      items: ['JWT + refresh rotation', 'OAuth 2.0 (Google, VK)', 'Анонимная регистрация', 'Rate limiting'],
    },
    {
      icon: 'fa-bolt',
      color: 'bg-tech',
      title: 'Real-time',
      items: ['Server-Sent Events', 'Redis Pub/Sub', 'Горизонтальное масштабирование', 'Heartbeat'],
    },
    {
      icon: 'fa-swords',
      color: 'bg-success',
      title: 'Боевая система',
      items: ['Дуэли с фазами', 'Интриги', 'Массовые сражения', '18 типов действий'],
    },
    {
      icon: 'fa-chart-line',
      color: 'bg-purple-600',
      title: 'Мониторинг',
      items: ['Prometheus метрики', 'Sentry errors', 'OpenTelemetry', 'Health checks'],
    },
    {
      icon: 'fa-docker',
      color: 'bg-orange-500',
      title: 'DevOps',
      items: ['Docker multi-stage', 'Docker Compose', 'Backup система', 'Graceful shutdown'],
      brand: true,
    },
    {
      icon: 'fa-database',
      color: 'bg-cyan-500',
      title: 'Данные L5R',
      items: ['7 великих кланов', 'Семьи и школы', 'Техники', 'Предметы и качества'],
    },
  ]

  return (
    <section id="achievements" className="py-16 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="font-header text-3xl font-bold mb-2 uppercase tracking-widest text-ink">
            Достижения (что уже сделано)
          </h3>
          <div className="w-16 h-1 bg-l5r-red mx-auto mb-4"></div>
          <p className="text-ink-light italic">Короткий "выжимной" список для портфолио.</p>
        </div>

        {/* Big Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="achievement-card p-6 text-center">
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
            <div key={i} className="card p-6">
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

