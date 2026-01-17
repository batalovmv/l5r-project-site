export default function Features() {
  return (
    <section id="features" className="py-20 bg-paper-dark border-b border-ink/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="section-title mb-4">Возможности приложения</h3>
          <div className="section-divider mx-auto mb-4"></div>
          <p className="section-subtitle mx-auto">
            Полноценный инструментарий для GM и игроков L5R 5th Edition
          </p>
          <p className="hint-text max-w-xl mx-auto mt-3">
            Backend документирован (OpenAPI) и покрыт автотестами; UI/UX и фронтенд стартуют после дизайна
          </p>
        </div>

        {/* Auth & Character Creation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Authentication */}
          <div className="feature-card">
            <div className="feature-icon bg-gradient-to-br from-purple-500 to-purple-700 text-white">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">Аккаунты и вход</h4>
            <ul className="space-y-2 text-ink-light">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-bolt text-l5r-gold mt-1"></i>
                <span><strong>Гостевой вход</strong> — начните играть мгновенно, без регистрации</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-brands fa-google text-red-500 mt-1"></i>
                <span><strong>OAuth</strong> — авторизация через Google или ВКонтакте</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-link text-tech mt-1"></i>
                <span>Гостевой аккаунт можно привязать позже</span>
              </li>
            </ul>
          </div>

          {/* Character Creation */}
          <div className="feature-card">
            <div className="feature-icon bg-gradient-to-br from-l5r-red to-red-800 text-white">
              <i className="fa-solid fa-scroll"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">
              Создание персонажа — «Игра 20 вопросов»
            </h4>
            <p className="text-ink-light text-sm mb-3">
              Полноценный пошаговый мастер создания персонажа по правилам книги:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Выбор клана', 'Выбор семьи', 'Выбор школы', 'Giri & Ninjo', 'Черты характера', 'Бросок наследия'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span className="w-6 h-6 bg-l5r-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-success mt-3">
              <i className="fa-solid fa-magic mr-1"></i> Все бонусы применяются автоматически!
            </p>
          </div>
        </div>

        {/* Character Sheet */}
        <div className="mb-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center">
            <i className="fa-solid fa-id-card text-l5r-gold mr-2"></i>Полный лист персонажа
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Rings */}
            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">Пять Колец</h5>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="ring-badge ring-air">空</span>
                <span className="ring-badge ring-earth">地</span>
                <span className="ring-badge ring-fire">火</span>
                <span className="ring-badge ring-water">水</span>
                <span className="ring-badge ring-void">虚</span>
              </div>
              <p className="text-xs text-gray-500">Air • Earth • Fire • Water • Void</p>
            </div>

            {/* Derived Stats */}
            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">Производные статы</h5>
              <ul className="text-sm space-y-1 text-ink-light">
                <li><i className="fa-solid fa-heart text-red-400 w-4"></i> Выносливость (Endurance)</li>
                <li><i className="fa-solid fa-brain text-purple-400 w-4"></i> Самообладание (Composure)</li>
                <li><i className="fa-solid fa-bullseye text-blue-400 w-4"></i> Фокус (Focus)</li>
                <li><i className="fa-solid fa-eye text-green-400 w-4"></i> Бдительность (Vigilance)</li>
              </ul>
              <p className="text-xs text-success mt-2"><i className="fa-solid fa-calculator mr-1"></i> Авто-расчёт</p>
            </div>

            {/* Void Points */}
            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">Void Points</h5>
              <ul className="text-xs space-y-1 text-ink-light">
                <li>• Seize the Moment (+1 кубик)</li>
                <li>• Clarity of Purpose</li>
                <li>• Recenter (снять Strife)</li>
                <li>• Активация техник</li>
                <li>• Противостояние смерти</li>
              </ul>
            </div>

            {/* Skills */}
            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">Навыки</h5>
              <p className="text-sm text-ink-light mb-2">Все навыки L5R 5e с рангами от 0 до 5</p>
              <p className="text-xs text-gray-500">Прокачка через трату XP</p>
            </div>
          </div>

          {/* More features */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">Техники</h5>
              <div className="flex flex-wrap gap-1 text-xs">
                {['Ката', 'Киходзюцу', 'Инвокации', 'Ритуалы', 'Шуджи', 'Маху'].map((tech, i) => (
                  <span key={i} className={`px-2 py-1 rounded ${
                    ['bg-red-50 text-red-700', 'bg-blue-50 text-blue-700', 'bg-orange-50 text-orange-700', 
                     'bg-purple-50 text-purple-700', 'bg-green-50 text-green-700', 'bg-gray-100 text-gray-700'][i]
                  }`}>{tech}</span>
                ))}
                <span className="px-2 py-1 bg-gray-800 text-white rounded">Ниндзютсу</span>
              </div>
            </div>

            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">Инвентарь</h5>
              <ul className="text-xs space-y-1 text-ink-light">
                {['Экипировка (надеть/снять)', 'Готовность (взять в руку)', 'Хват (одно/двуручный)', 'Состояние предмета', 'Нагрузка (Encumbrance)'].map((item, i) => (
                  <li key={i}><i className="fa-solid fa-check text-success mr-1"></i> {item}</li>
                ))}
              </ul>
            </div>

            <div className="card p-5">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">Валюта и черты</h5>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">Koku 💰</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-bold">Bu 🥈</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">Zeni 🥉</span>
              </div>
              <p className="text-xs text-ink-light">Distinctions • Adversities • Passions • Anxieties</p>
            </div>
          </div>
        </div>

        {/* Scenes */}
        <div className="mb-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center">
            <i className="fa-solid fa-theater-masks text-l5r-gold mr-2"></i>Сцены — главный геймплей!
          </h4>
          <p className="text-center text-ink-light mb-8 max-w-2xl mx-auto">
            Пять типов сцен, соответствующих правилам L5R 5e
          </p>
          <p className="hint-text text-center max-w-xl mx-auto -mt-4 mb-8">
            Каждый тип сцены имеет свою конечную машину состояний (FSM) и валидацию действий
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: 'fa-swords', name: 'Бой (Skirmish)', desc: 'Атаки, защита, маневры', color: 'bg-red-100 text-red-600' },
              { icon: 'fa-khanda', name: 'Дуэли', desc: '4 фазы: Оценка → Удар', color: 'bg-amber-100 text-amber-600' },
              { icon: 'fa-comments', name: 'Интриги', desc: 'Социальные конфликты', color: 'bg-purple-100 text-purple-600' },
              { icon: 'fa-book-open', name: 'Нарратив', desc: 'Исследование и отыгрыш', color: 'bg-green-100 text-green-600' },
              { icon: 'fa-chess-rook', name: 'Mass Battle', desc: 'Командование армиями', color: 'bg-gray-800 text-white' },
            ].map((scene, i) => (
              <div key={i} className="scene-card text-center">
                <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center ${scene.color}`}>
                  <i className={`fa-solid ${scene.icon} text-2xl`}></i>
                </div>
                <h5 className="font-header font-bold text-sm mb-2">{scene.name}</h5>
                <p className="text-xs text-gray-500">{scene.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-header font-bold mb-3 text-l5r-red">
                  <i className="fa-solid fa-swords mr-2"></i>Боевые механики
                </h5>
                <ul className="text-sm space-y-1 text-ink-light">
                  <li>• Атака, Защита, Помощь — все боевые действия</li>
                  <li>• Маневр — перемещение между дистанциями (Range 0-4)</li>
                  <li>• Подготовка оружия — достать, убрать, сменить хват</li>
                  <li>• Успокаивающее дыхание — снять напряжение</li>
                  <li>• Ожидание — подготовить действие на триггер</li>
                </ul>
              </div>
              <div>
                <h5 className="font-header font-bold mb-3 text-l5r-red">
                  <i className="fa-solid fa-heart-crack mr-2"></i>Критические ранения
                </h5>
                <ul className="text-sm space-y-1 text-ink-light">
                  <li>• Авто-бросок при превышении Выносливости</li>
                  <li>• Таблица последствий (Severity 1-20)</li>
                  <li>• Лечение через Medicine и время</li>
                  <li>• Возможность потратить Void чтобы выжить</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns, Downtime, GM Tools */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="feature-icon bg-gradient-to-br from-tech to-blue-700 text-white">
              <i className="fa-solid fa-users"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">Кампании</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li><i className="fa-solid fa-key text-l5r-gold mr-2"></i>Уникальный код приглашения</li>
              <li><i className="fa-solid fa-bolt text-tech mr-2"></i>Realtime синхронизация</li>
              <li><i className="fa-solid fa-book text-success mr-2"></i>Разрешённые книги правил</li>
              <li><i className="fa-solid fa-circle text-green-500 mr-2"></i>Онлайн-статус участников</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-gradient-to-br from-success to-emerald-700 text-white">
              <i className="fa-solid fa-bed"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">Отдых (Downtime)</h4>
            <ul className="space-y-1 text-sm text-ink-light">
              <li>🏥 Лечение Fatigue и крит. ранений</li>
              <li>🧘 Восстановление Strife и Void</li>
              <li>⚔️ Тренировка навыков</li>
              <li>🔨 Крафтинг предметов</li>
              <li>📚 Исследование</li>
              <li>🤝 Налаживание связей</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-gradient-to-br from-l5r-gold to-amber-700 text-white">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">Инструменты GM</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li><i className="fa-solid fa-eye-slash text-purple-500 mr-2"></i>Приватные заметки для игроков</li>
              <li><i className="fa-solid fa-unlock text-l5r-gold mr-2"></i>Раскрытие секретов в нужный момент</li>
              <li><i className="fa-solid fa-coins text-yellow-500 mr-2"></i>Выдача XP с указанием причины</li>
              <li><i className="fa-solid fa-calendar text-tech mr-2"></i>Журнал сессий и событий</li>
            </ul>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="mt-12 card p-8">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center">
            <i className="fa-solid fa-book-bookmark text-l5r-gold mr-2"></i>База знаний L5R 5e
          </h4>
          <p className="text-center text-ink-light mb-6">
            Полные справочники на <strong>русском</strong> и <strong>английском</strong> языках
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { icon: 'fa-torii-gate', name: 'Кланы' },
              { icon: 'fa-people-roof', name: 'Семьи' },
              { icon: 'fa-school', name: 'Школы' },
              { icon: 'fa-fire', name: 'Техники' },
              { icon: 'fa-shield', name: 'Предметы' },
              { icon: 'fa-gem', name: 'Качества' },
              { icon: 'fa-masks-theater', name: 'Черты' },
              { icon: 'fa-user-ninja', name: 'NPC' },
              { icon: 'fa-award', name: 'Титулы' },
              { icon: 'fa-scroll', name: 'Наследие' },
              { icon: 'fa-virus', name: 'Состояния' },
              { icon: 'fa-heart-crack', name: 'Крит. раны' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-white/50 rounded-lg">
                <i className={`fa-solid ${item.icon} text-2xl text-l5r-red mb-2`}></i>
                <p className="text-xs font-bold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In Development */}
        <div className="mt-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center">
            <i className="fa-solid fa-wrench text-l5r-gold mr-2"></i>Следующий этап
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: 'fa-pen-ruler', color: 'text-l5r-gold', name: 'UI/UX дизайн', desc: 'Макетов пока нет: ТЗ + референсы → дизайн‑система', muted: false },
              { icon: 'fa-mobile-screen', color: 'text-tech', name: 'Frontend (React Native)', desc: 'Старт после дизайна: экраны + навигация', muted: true },
              { icon: 'fa-flask-vial', color: 'text-success', name: 'QA / Beta', desc: 'Тестирование продукта начнётся после UI', muted: true },
              { icon: 'fa-dice', color: 'text-l5r-red', name: 'Dice Roller', desc: 'Визуальный бросок кубиков L5R', muted: true },
            ].map((item, i) => (
              <div key={i} className={`card-soft p-5 text-center ${item.muted ? 'opacity-70' : ''}`}>
                <i className={`fa-solid ${item.icon} text-3xl ${item.color} mb-3`}></i>
                <h5 className="font-header font-bold text-sm mb-2">{item.name}</h5>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

