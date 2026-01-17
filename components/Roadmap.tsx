export default function Roadmap() {
  const phases = [
    {
      status: 'done',
      icon: 'fa-server',
      label: 'Завершено',
      title: 'Backend API',
      color: 'border-success',
      bgColor: 'bg-success',
      items: [
        { status: 'done', text: 'Express + TypeScript сервер' },
        { status: 'done', text: 'PostgreSQL + Prisma (92 таблицы)' },
        { status: 'done', text: 'JWT + OAuth аутентификация' },
        { status: 'done', text: 'SSE + Redis realtime' },
        { status: 'done', text: 'Боевая система (дуэли, интриги, mass battle)' },
        { status: 'done', text: 'XP, Notes, Sessions, Downtime' },
        { status: 'done', text: 'Docker + Prometheus + Sentry' },
        { status: 'done', text: 'Справочные данные L5R (5 книг)' },
      ],
    },
    {
      status: 'current',
      icon: 'fa-palette',
      label: 'В работе',
      title: 'UI/UX Дизайн',
      color: 'border-l5r-gold',
      bgColor: 'bg-l5r-gold',
      items: [
        { status: 'wip', text: 'Дизайн-система L5R стиля' },
        { status: 'wip', text: 'Home Screen' },
        { status: 'pending', text: 'Characters List' },
        { status: 'pending', text: 'Character Details (лист персонажа)' },
        { status: 'pending', text: 'Campaigns screens' },
        { status: 'pending', text: 'Scene/Combat UI' },
      ],
    },
    {
      status: 'pending',
      icon: 'fa-code',
      label: 'Планируется',
      title: 'Frontend Разработка',
      color: 'border-gray-200',
      bgColor: 'bg-gray-300',
      items: [
        { status: 'pending', text: 'Реализация всех экранов по макетам' },
        { status: 'pending', text: 'Character Wizard "20 вопросов" (~10 экранов)' },
        { status: 'pending', text: 'Dice roller с анимацией' },
        { status: 'pending', text: 'OAuth на фронтенде' },
        { status: 'pending', text: 'Offline mode' },
        { status: 'pending', text: 'Push notifications' },
      ],
    },
    {
      status: 'pending',
      icon: 'fa-flask-vial',
      label: 'Планируется',
      title: 'Тестирование',
      color: 'border-gray-200',
      bgColor: 'bg-gray-300',
      items: [
        { status: 'done', text: 'Jest setup + API integration tests' },
        { status: 'pending', text: 'Unit tests 80%+ coverage' },
        { status: 'pending', text: 'E2E tests (Detox)' },
        { status: 'pending', text: 'Beta-тестирование L5R сообщества' },
      ],
    },
    {
      status: 'pending',
      icon: 'fa-rocket',
      label: 'Цель',
      title: 'Релиз v1.0',
      color: 'border-gray-200',
      bgColor: 'bg-l5r-red/50',
      items: [
        { status: 'pending', text: 'App Store публикация (iOS)' },
        { status: 'pending', text: 'Google Play публикация (Android)' },
        { status: 'pending', text: 'Landing page + документация' },
      ],
    },
  ]

  const future = [
    'Дополнительные книги',
    'PDF экспорт',
    'Web-версия для GM',
    'Генератор NPC',
    'VTT интеграция',
    'Карты локаций',
  ]

  return (
    <section id="roadmap" className="py-24 bg-paper-dark relative overflow-hidden">
      <div className="kanji-watermark text-[25rem] top-20 -left-20 text-l5r-red opacity-[0.03]">時</div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="font-header text-4xl font-bold text-ink mb-4 uppercase tracking-widest">
            План Развития
          </h3>
          <div className="w-24 h-1 bg-l5r-red mx-auto mb-4"></div>
          <p className="font-body text-ink-light italic max-w-2xl mx-auto">
            Путь от MVP до публикации в App Store и Google Play
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline max-w-5xl mx-auto">
          {phases.map((phase, i) => (
            <div key={i} className="timeline-item">
              <div className={`timeline-dot ${phase.status}`}></div>
              <div className={`timeline-content bg-white rounded-xl shadow-lg border-2 ${phase.color} p-6 max-w-lg ${phase.status === 'pending' ? 'bg-white/80' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${phase.bgColor} rounded-xl flex items-center justify-center shadow-md`}>
                    <i className={`fa-solid ${phase.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <span className={`text-xs font-code font-bold uppercase tracking-wider ${
                      phase.status === 'done' ? 'text-success' : 
                      phase.status === 'current' ? 'text-l5r-gold' : 'text-gray-400'
                    }`}>
                      {phase.label}
                    </span>
                    <h4 className="font-header text-xl font-bold text-ink">{phase.title}</h4>
                  </div>
                </div>
                <div className={`space-y-2 text-sm ${phase.status === 'pending' ? 'text-gray-600' : ''}`}>
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-center">
                      <span className={`roadmap-check ${item.status}`}>
                        {item.status === 'done' && <i className="fa-solid fa-check text-[10px]"></i>}
                        {item.status === 'wip' && <i className="fa-solid fa-gear text-[10px]"></i>}
                        {item.status === 'pending' && <i className="fa-solid fa-circle text-[6px]"></i>}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Future */}
          <div className="timeline-item pb-0">
            <div className="timeline-dot pending"></div>
            <div className="timeline-content bg-white/40 rounded-xl shadow border border-gray-200 p-6 max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-crystal-ball text-gray-400 text-xl"></i>
                </div>
                <div>
                  <span className="text-xs font-code font-bold text-gray-400 uppercase tracking-wider">Будущее</span>
                  <h4 className="font-header text-xl font-bold text-gray-500">Развитие</h4>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                {future.map((item, i) => (
                  <div key={i}>• {item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

