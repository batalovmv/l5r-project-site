'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function Features() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const characterSteps =
    locale === 'ru'
      ? ['Выбор клана', 'Выбор семьи', 'Выбор школы', 'Giri & Ninjo', 'Черты характера', 'Бросок наследия']
      : ['Choose clan', 'Choose family', 'Choose school', 'Giri & Ninjo', 'Personality traits', 'Heritage roll']

  const techniqueTypes =
    locale === 'ru' ? ['Ката', 'Киходзюцу', 'Инвокации', 'Ритуалы', 'Шуджи', 'Маху'] : ['Kata', 'Kihojutsu', 'Invocations', 'Rituals', 'Shuji', 'Mahu']

  const inventoryItems =
    locale === 'ru'
      ? ['Экипировка (надеть/снять)', 'Готовность (взять в руку)', 'Хват (одно/двуручный)', 'Состояние предмета', 'Нагрузка (Encumbrance)']
      : ['Equipment (wear/remove)', 'Readied items (take in hand)', 'Grip (one/two-handed)', 'Item status', 'Encumbrance']

  const scenes =
    locale === 'ru'
      ? [
          { icon: 'fa-khanda', name: 'Бой (Skirmish)', desc: 'Атаки, защита, маневры', color: 'bg-red-100 text-red-600' },
          { icon: 'fa-khanda', name: 'Дуэли', desc: '4 фазы: Оценка → Удар', color: 'bg-amber-100 text-amber-600' },
          { icon: 'fa-comments', name: 'Интриги', desc: 'Социальные конфликты', color: 'bg-purple-100 text-purple-600' },
          { icon: 'fa-book-open', name: 'Нарратив', desc: 'Исследование и отыгрыш', color: 'bg-green-100 text-green-600' },
          { icon: 'fa-chess-rook', name: 'Mass Battle', desc: 'Командование армиями', color: 'bg-gray-800 text-white' },
        ]
      : [
          { icon: 'fa-khanda', name: 'Skirmish', desc: 'Attacks, defense, maneuvers', color: 'bg-red-100 text-red-600' },
          { icon: 'fa-khanda', name: 'Duel', desc: '4 phases: Assess → Strike', color: 'bg-amber-100 text-amber-600' },
          { icon: 'fa-comments', name: 'Intrigue', desc: 'Social conflicts', color: 'bg-purple-100 text-purple-600' },
          { icon: 'fa-book-open', name: 'Narrative', desc: 'Exploration and roleplay', color: 'bg-green-100 text-green-600' },
          { icon: 'fa-chess-rook', name: 'Mass Battle', desc: 'Commanding armies', color: 'bg-gray-800 text-white' },
        ]

  const combatMechanics =
    locale === 'ru'
      ? [
          'Атака, Защита, Помощь — все боевые действия',
          'Маневр — перемещение между дистанциями (Range 0–4)',
          'Подготовка оружия — достать, убрать, сменить хват',
          'Успокаивающее дыхание — снять напряжение',
          'Ожидание — подготовить действие на триггер',
        ]
      : [
          'Attack, Defend, Assist — all combat actions',
          'Maneuver — movement between range bands (0–4)',
          'Ready weapon — draw, stow, change grip',
          'Calming breath — remove strife',
          'Wait — prepare an action for a trigger',
        ]

  const criticalInjuries =
    locale === 'ru'
      ? [
          'Авто-бросок при превышении Выносливости',
          'Таблица последствий (Severity 1–20)',
          'Лечение через Medicine и время',
          'Возможность потратить Void чтобы выжить',
        ]
      : [
          'Auto-roll when exceeding Endurance',
          'Consequences table (Severity 1–20)',
          'Healing via Medicine and time',
          'Option to spend Void to survive',
        ]

  const knowledgeCards =
    locale === 'ru'
      ? [
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
        ]
      : [
          { icon: 'fa-torii-gate', name: 'Clans' },
          { icon: 'fa-people-roof', name: 'Families' },
          { icon: 'fa-school', name: 'Schools' },
          { icon: 'fa-fire', name: 'Techniques' },
          { icon: 'fa-shield', name: 'Items' },
          { icon: 'fa-gem', name: 'Qualities' },
          { icon: 'fa-masks-theater', name: 'Traits' },
          { icon: 'fa-user-ninja', name: 'NPC' },
          { icon: 'fa-award', name: 'Titles' },
          { icon: 'fa-scroll', name: 'Heritage' },
          { icon: 'fa-virus', name: 'Conditions' },
          { icon: 'fa-heart-crack', name: 'Critical Injuries' },
        ]

  const nextSteps =
    locale === 'ru'
      ? [
          { icon: 'fa-pen-ruler', color: 'text-l5r-gold', name: 'UI/UX дизайн', desc: 'Ожидаю макеты с 8 янв 2026; без них разработка на паузе', muted: false },
          { icon: 'fa-mobile-screen', color: 'text-tech', name: 'Frontend (React Native)', desc: 'Старт после дизайна; сейчас стоп', muted: true },
          { icon: 'fa-flask-vial', color: 'text-success', name: 'QA / Beta', desc: 'После UI; пока на паузе', muted: true },
          { icon: 'fa-dice', color: 'text-l5r-red', name: 'Dice Roller', desc: 'Визуальный бросок кубиков L5R', muted: true },
        ]
      : [
          { icon: 'fa-pen-ruler', color: 'text-l5r-gold', name: 'UI/UX design', desc: 'Waiting for mockups since Jan 8, 2026; development is on hold', muted: false },
          { icon: 'fa-mobile-screen', color: 'text-tech', name: 'Frontend (React Native)', desc: 'Starts after design; currently on hold', muted: true },
          { icon: 'fa-flask-vial', color: 'text-success', name: 'QA / Beta', desc: 'After UI; currently on hold', muted: true },
          { icon: 'fa-dice', color: 'text-l5r-red', name: 'Dice roller', desc: 'Visual L5R dice roll', muted: true },
        ]

  return (
    <section id="features" className="py-20 bg-paper-dark border-b border-ink/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="section-title mb-0">{t('Архитектура приложения', 'App architecture')}</h3>
            <SectionLinkButton targetId="features" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
          <p className="section-subtitle mx-auto">
            {t(
              'Ключевые механики L5R 5e уже собраны и работают локально; интерфейс ждёт UI/UX дизайна — разработка сейчас на паузе.',
              'Key L5R 5e mechanics are already assembled and run locally; the UI is waiting on UI/UX design — development is currently paused.'
            )}
          </p>
          <p className="hint-text max-w-xl mx-auto mt-3">
            {t(
              'Приложение полностью автономно: никаких серверов и аккаунтов, все данные остаются на устройстве',
              'The app is fully standalone: no servers or accounts, all data stays on the device'
            )}
          </p>
        </div>

        <div className="card p-6 mb-8" data-reveal>
          <h4 className="font-header text-xl font-bold text-ink mb-4">
            <i className="fa-solid fa-folder-tree text-l5r-gold mr-2"></i>
            {t('Структура монорепо', 'Monorepo Structure')}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-bold text-sm mb-2 text-tech">backend/</h5>
              <ul className="text-sm text-ink-light space-y-1">
                <li>• Node.js 20+ / Express</li>
                <li>• PostgreSQL + Prisma ORM</li>
                <li>• {t('55 миграций', '55 migrations')}</li>
                <li>• {t('Справочные данные L5R', 'L5R reference data')}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-2 text-tech">mobile/</h5>
              <ul className="text-sm text-ink-light space-y-1">
                <li>• React Native (Expo 54)</li>
                <li>• SQLite (expo-sqlite)</li>
                <li>• Zustand + React Hook Form</li>
                <li>• {t('44 сервиса', '44 services')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="feature-card" data-reveal data-reveal-delay="0">
            <div className="feature-icon bg-gradient-to-br from-gray-700 to-gray-900 text-white">
              <i className="fa-solid fa-wifi-slash"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">{t('Полностью оффлайн', 'Fully offline')}</h4>
            <ul className="space-y-2 text-ink-light">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-lock text-l5r-gold mt-1"></i>
                <span>{t('Никаких серверов и логина', 'No servers or logins')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-hard-drive text-tech mt-1"></i>
                <span>{t('Все данные хранятся локально на устройстве', 'All data is stored locally on the device')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-file-export text-success mt-1"></i>
                <span>{t('Экспорт и перенос персонажей через PDF/JSON', 'Export and transfer characters via PDF/JSON')}</span>
              </li>
            </ul>
          </div>

          <div className="feature-card" data-reveal data-reveal-delay="120">
            <div className="feature-icon bg-gradient-to-br from-l5r-red to-red-800 text-white">
              <i className="fa-solid fa-scroll"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">
              {t('Создание персонажа — «Игра 20 вопросов»', 'Character creation — “20 Questions”')}
            </h4>
            <p className="text-ink-light text-sm mb-3">
              {t(
                'Полноценный пошаговый мастер создания персонажа по правилам книги:',
                'A step-by-step character builder aligned with the rules:'
              )}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {characterSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span className="w-6 h-6 bg-l5r-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-success mt-3">
              <i className="fa-solid fa-magic mr-1"></i> {t('Все бонусы применяются автоматически!', 'All bonuses are applied automatically!')}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center" data-reveal>
            <i className="fa-solid fa-id-card text-l5r-gold mr-2"></i>
            {t('Полный лист персонажа', 'Full character sheet')}
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-5" data-reveal data-reveal-delay="0">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">{t('Пять Колец', 'Five Rings')}</h5>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="ring-badge ring-air">空</span>
                <span className="ring-badge ring-earth">地</span>
                <span className="ring-badge ring-fire">火</span>
                <span className="ring-badge ring-water">水</span>
                <span className="ring-badge ring-void">虚</span>
              </div>
              <p className="text-xs text-gray-500">Air • Earth • Fire • Water • Void</p>
            </div>

            <div className="card p-5" data-reveal data-reveal-delay="90">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">
                {t('Производные статы', 'Derived stats')}
              </h5>
              <ul className="text-sm space-y-1 text-ink-light">
                <li>
                  <i className="fa-solid fa-heart text-red-400 w-4"></i> {t('Выносливость', 'Endurance')}
                </li>
                <li>
                  <i className="fa-solid fa-brain text-purple-400 w-4"></i> {t('Самообладание', 'Composure')}
                </li>
                <li>
                  <i className="fa-solid fa-bullseye text-blue-400 w-4"></i> {t('Фокус', 'Focus')}
                </li>
                <li>
                  <i className="fa-solid fa-eye text-green-400 w-4"></i> {t('Бдительность', 'Vigilance')}
                </li>
              </ul>
              <p className="text-xs text-success mt-2">
                <i className="fa-solid fa-calculator mr-1"></i> {t('Авто-расчёт', 'Auto-calculated')}
              </p>
            </div>

            <div className="card p-5" data-reveal data-reveal-delay="180">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">Void Points</h5>
              <ul className="text-xs space-y-1 text-ink-light">
                <li>• Seize the Moment {t('(+1 кубик)', '(+1 die)')}</li>
                <li>• Clarity of Purpose</li>
                <li>• Recenter {t('(снять Strife)', '(remove Strife)')}</li>
                <li>• {t('Активация техник', 'Technique activation')}</li>
                <li>• {t('Противостояние смерти', 'Resist death')}</li>
              </ul>
            </div>

            <div className="card p-5" data-reveal data-reveal-delay="270">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-l5r-red">{t('Навыки', 'Skills')}</h5>
              <p className="text-sm text-ink-light mb-2">{t('Все навыки L5R 5e с рангами от 0 до 5', 'All L5R 5e skills with ranks 0–5')}</p>
              <p className="text-xs text-gray-500">{t('Прокачка через трату XP', 'Progression via spending XP')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="card p-5" data-reveal data-reveal-delay="0">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">{t('Техники', 'Techniques')}</h5>
              <div className="flex flex-wrap gap-1 text-xs">
                {techniqueTypes.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded ${
                      ['bg-red-50 text-red-700', 'bg-blue-50 text-blue-700', 'bg-orange-50 text-orange-700', 'bg-purple-50 text-purple-700', 'bg-green-50 text-green-700', 'bg-gray-100 text-gray-700'][i]
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                <span className="px-2 py-1 bg-gray-800 text-white rounded">{t('Ниндзютсу', 'Ninjutsu')}</span>
              </div>
            </div>

            <div className="card p-5" data-reveal data-reveal-delay="90">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">{t('Инвентарь', 'Inventory')}</h5>
              <ul className="text-xs space-y-1 text-ink-light">
                {inventoryItems.map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-check text-success mr-1"></i> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5" data-reveal data-reveal-delay="180">
              <h5 className="font-header font-bold text-sm uppercase tracking-wider mb-3 text-tech">
                {t('Валюта и черты', 'Currency & traits')}
              </h5>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">Koku</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-bold">Bu</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">Zeni</span>
              </div>
              <p className="text-xs text-ink-light">Distinctions • Adversities • Passions • Anxieties</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center" data-reveal>
            <i className="fa-solid fa-theater-masks text-l5r-gold mr-2"></i>
            {t('Сцены — главный геймплей!', 'Scenes are the core gameplay')}
          </h4>
          <p className="text-center text-ink-light mb-8 max-w-2xl mx-auto" data-reveal data-reveal-delay="90">
            {t('Пять типов сцен, соответствующих правилам L5R 5e', 'Five scene types aligned with L5R 5e rules')}
          </p>
          <p className="hint-text text-center max-w-xl mx-auto -mt-4 mb-8" data-reveal data-reveal-delay="120">
            {t(
              'Каждый тип сцены имеет свою конечную машину состояний (FSM) и валидацию действий',
              'Each scene type has its own finite-state machine (FSM) and action validation'
            )}
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {scenes.map((scene, i) => (
              <div key={i} className="scene-card text-center" data-reveal data-reveal-delay={String(i * 80)}>
                <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center ${scene.color}`}>
                  <i className={`fa-solid ${scene.icon} text-2xl`}></i>
                </div>
                <h5 className="font-header font-bold text-sm mb-2">{scene.name}</h5>
                <p className="text-xs text-gray-500">{scene.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 card p-6" data-reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-header font-bold mb-3 text-l5r-red">
                  <i className="fa-solid fa-khanda mr-2"></i>
                  {t('Боевые механики', 'Combat mechanics')}
                </h5>
                <ul className="text-sm space-y-1 text-ink-light">
                  {combatMechanics.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-header font-bold mb-3 text-l5r-red">
                  <i className="fa-solid fa-heart-crack mr-2"></i>
                  {t('Критические ранения', 'Critical injuries')}
                </h5>
                <ul className="text-sm space-y-1 text-ink-light">
                  {criticalInjuries.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="feature-card" data-reveal data-reveal-delay="0">
            <div className="feature-icon bg-gradient-to-br from-tech to-blue-700 text-white">
              <i className="fa-solid fa-users"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">{t('Кампании', 'Campaigns')}</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li>
                <i className="fa-solid fa-cloud-arrow-down text-success mr-2"></i>
                {t('Локальный экспорт/импорт JSON', 'Local JSON export/import')}
              </li>
            </ul>
          </div>

          <div className="feature-card" data-reveal data-reveal-delay="120">
            <div className="feature-icon bg-gradient-to-br from-success to-emerald-700 text-white">
              <i className="fa-solid fa-bed"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">{t('Отдых (Downtime)', 'Downtime')}</h4>
            <ul className="space-y-1 text-sm text-ink-light">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-kit-medical text-success mt-0.5"></i>
                <span>{t('Лечение Fatigue и крит. ранений', 'Heal fatigue and critical injuries')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-spa text-purple-600 mt-0.5"></i>
                <span>{t('Восстановление Strife и Void', 'Recover strife and void')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-dumbbell text-l5r-red mt-0.5"></i>
                <span>{t('Тренировка навыков', 'Train skills')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-hammer text-tech mt-0.5"></i>
                <span>{t('Крафтинг предметов', 'Craft items')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-compass text-l5r-gold mt-0.5"></i>
                <span>{t('Исследование', 'Research')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-handshake text-gray-600 mt-0.5"></i>
                <span>{t('Налаживание связей', 'Build connections')}</span>
              </li>
            </ul>
          </div>

          <div className="feature-card" data-reveal data-reveal-delay="240">
            <div className="feature-icon bg-gradient-to-br from-l5r-gold to-amber-700 text-white">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h4 className="font-header text-xl font-bold text-ink mb-3">{t('Инструменты GM', 'GM tools')}</h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li>
                <i className="fa-solid fa-file-pdf text-red-500 mr-2"></i>
                {t('PDF экспорт персонажа', 'Character PDF export')}
              </li>
              <li>
                <i className="fa-solid fa-eye-slash text-purple-500 mr-2"></i>
                {t('Приватные заметки', 'Private notes')}
              </li>
              <li>
                <i className="fa-solid fa-wand-magic-sparkles text-pink-500 mr-2"></i>
                {t('Генератор NPC (локальный)', 'NPC generator (local)')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 card p-8" data-reveal>
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center" data-reveal data-reveal-delay="90">
            <i className="fa-solid fa-book-bookmark text-l5r-gold mr-2"></i>
            {t('База знаний L5R 5e', 'L5R 5e knowledge base')}
          </h4>
          <p className="text-center text-ink-light mb-6" data-reveal data-reveal-delay="120">
            {t('Полные справочники на ', 'Full reference in ')}
            <strong>{t('русском', 'Russian')}</strong> {t('и', 'and')} <strong>{t('английском', 'English')}</strong> {t(' языках', '')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {knowledgeCards.map((item, i) => (
              <div
                key={i}
                className="text-center p-3 bg-white/50 rounded-lg"
                data-reveal
                data-reveal-delay={String(150 + i * 35)}
              >
                <i className={`fa-solid ${item.icon} text-2xl text-l5r-red mb-2`}></i>
                <p className="text-xs font-bold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h4 className="font-header text-2xl font-bold text-ink mb-6 text-center" data-reveal>
            <i className="fa-solid fa-wrench text-l5r-gold mr-2"></i>
            {t('Следующий этап', 'Next stage')}
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {nextSteps.map((item, i) => (
              <div
                key={i}
                className={`card-soft p-5 text-center ${item.muted ? 'opacity-70' : ''}`}
                data-reveal
                data-reveal-delay={String(i * 90)}
              >
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
