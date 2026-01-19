'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function Roadmap() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const phases =
    locale === 'ru'
      ? [
          {
            status: 'done',
            icon: 'fa-server',
            label: 'Завершено',
            title: 'Backend API',
            color: 'border-success',
            bgColor: 'bg-success',
            items: [
              { status: 'done', text: 'Express + TypeScript сервер' },
              { status: 'done', text: 'PostgreSQL + Prisma (109 таблиц)' },
              { status: 'done', text: 'JWT + OAuth аутентификация' },
              { status: 'done', text: 'SSE + Redis realtime' },
              { status: 'done', text: 'Боевая система (дуэли, интриги, mass battle)' },
              { status: 'done', text: 'XP, Notes, Sessions, Downtime' },
              { status: 'done', text: 'Docker + Prometheus + Sentry' },
              { status: 'done', text: 'Feature flags + kill switch' },
              { status: 'done', text: 'Справочные данные L5R (5 книг)' },
              { status: 'done', text: 'Jest автотесты + OpenAPI контракт' },
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
              { status: 'wip', text: 'ТЗ + референсы (дизайн пока отсутствует)' },
              { status: 'pending', text: 'Дизайн‑система (цвета, типографика, UI kit)' },
              { status: 'pending', text: 'Прототип основного UX флоу' },
              { status: 'pending', text: 'Макеты ключевых экранов (Home/Characters/Sheet)' },
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
              { status: 'pending', text: 'Старт разработки после готовых макетов' },
              { status: 'pending', text: 'Реализация всех экранов по дизайну' },
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
            title: 'Тестирование (продукт)',
            color: 'border-gray-200',
            bgColor: 'bg-gray-300',
            items: [
              { status: 'pending', text: 'UX/QA чек‑листы и тест‑план' },
              { status: 'pending', text: 'Unit tests на фронтенде' },
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
      : [
          {
            status: 'done',
            icon: 'fa-server',
            label: 'Completed',
            title: 'Backend API',
            color: 'border-success',
            bgColor: 'bg-success',
            items: [
              { status: 'done', text: 'Express + TypeScript server' },
              { status: 'done', text: 'PostgreSQL + Prisma (109 tables)' },
              { status: 'done', text: 'JWT + OAuth authentication' },
              { status: 'done', text: 'SSE + Redis realtime' },
              { status: 'done', text: 'Combat system (duels, intrigues, mass battle)' },
              { status: 'done', text: 'XP, Notes, Sessions, Downtime' },
              { status: 'done', text: 'Docker + Prometheus + Sentry' },
              { status: 'done', text: 'Feature flags + kill switch' },
              { status: 'done', text: 'L5R reference data (5 books)' },
              { status: 'done', text: 'Jest tests + OpenAPI contract' },
            ],
          },
          {
            status: 'current',
            icon: 'fa-palette',
            label: 'In progress',
            title: 'UI/UX Design',
            color: 'border-l5r-gold',
            bgColor: 'bg-l5r-gold',
            items: [
              { status: 'wip', text: 'Scope + references (no designs yet)' },
              { status: 'pending', text: 'Design system (colors, typography, UI kit)' },
              { status: 'pending', text: 'Main UX flow prototype' },
              { status: 'pending', text: 'Key screens (Home/Characters/Sheet)' },
              { status: 'pending', text: 'Campaigns screens' },
              { status: 'pending', text: 'Scene/Combat UI' },
            ],
          },
          {
            status: 'pending',
            icon: 'fa-code',
            label: 'Planned',
            title: 'Frontend Development',
            color: 'border-gray-200',
            bgColor: 'bg-gray-300',
            items: [
              { status: 'pending', text: 'Start after designs are ready' },
              { status: 'pending', text: 'Implement all screens from the design' },
              { status: 'pending', text: 'Character Wizard “20 Questions” (~10 screens)' },
              { status: 'pending', text: 'Dice roller with animations' },
              { status: 'pending', text: 'OAuth on the frontend' },
              { status: 'pending', text: 'Offline mode' },
              { status: 'pending', text: 'Push notifications' },
            ],
          },
          {
            status: 'pending',
            icon: 'fa-flask-vial',
            label: 'Planned',
            title: 'Product Testing',
            color: 'border-gray-200',
            bgColor: 'bg-gray-300',
            items: [
              { status: 'pending', text: 'UX/QA checklists and test plan' },
              { status: 'pending', text: 'Frontend unit tests' },
              { status: 'pending', text: 'E2E tests (Detox)' },
              { status: 'pending', text: 'Community beta testing' },
            ],
          },
          {
            status: 'pending',
            icon: 'fa-rocket',
            label: 'Target',
            title: 'Release v1.0',
            color: 'border-gray-200',
            bgColor: 'bg-l5r-red/50',
            items: [
              { status: 'pending', text: 'App Store release (iOS)' },
              { status: 'pending', text: 'Google Play release (Android)' },
              { status: 'pending', text: 'Landing page + docs' },
            ],
          },
        ]

  const future =
    locale === 'ru'
      ? ['Дополнительные книги', 'Web-версия для GM', 'Карты локаций', 'Офлайн-режим']
      : ['More books', 'Web version for GM', 'Location maps', 'Offline mode']

  return (
    <section id="roadmap" className="py-24 bg-paper-dark relative overflow-hidden">
      <div className="kanji-watermark text-[25rem] top-20 -left-20 text-l5r-red opacity-[0.03]">時</div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="section-title mb-0">{t('План развития', 'Roadmap')}</h3>
            <SectionLinkButton targetId="roadmap" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
          <p className="hint-text max-w-xl mx-auto mt-4">
            {t(
              'Backend готов. Сейчас нужен дизайн — фронтенд стартует по готовым макетам.',
              'Backend is ready. Design is next — frontend starts from the finished designs.'
            )}
          </p>
          <p className="section-subtitle mx-auto">
            {t('Путь от MVP до публикации в App Store и Google Play', 'From MVP to App Store and Google Play release')}
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline max-w-5xl mx-auto">
          {phases.map((phase, i) => (
            <div key={i} className="timeline-item">
              <div className={`timeline-dot ${phase.status}`}></div>
              <div
                className={`timeline-content bg-white rounded-xl shadow-lg border-2 ${phase.color} p-6 max-w-lg ${phase.status === 'pending' ? 'bg-white/80' : ''}`}
                data-reveal
                data-reveal-delay={String((i % 2) * 90)}
              >
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
            <div className="timeline-content bg-white/40 rounded-xl shadow border border-gray-200 p-6 max-w-lg" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-crystal-ball text-gray-400 text-xl"></i>
                </div>
                <div>
                  <span className="text-xs font-code font-bold text-gray-400 uppercase tracking-wider">
                    {t('Будущее', 'Future')}
                  </span>
                  <h4 className="font-header text-xl font-bold text-gray-500">{t('Развитие', 'Ideas')}</h4>
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

