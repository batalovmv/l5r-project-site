'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

type Status = 'done' | 'wip' | 'pending'

type Milestone = {
  id: string
  icon: string
  status: Status
  title: { ru: string; en: string }
  desc: { ru: string; en: string }
  targetId: string
}

const STATUS_CHIP: Record<Status, { ru: string; en: string; className: string }> = {
  done: { ru: 'ГОТОВО', en: 'DONE', className: 'chip chip-done' },
  wip: { ru: 'В РАБОТЕ', en: 'IN PROGRESS', className: 'chip chip-wip' },
  pending: { ru: 'ПЛАН', en: 'PLANNED', className: 'chip chip-pending' },
}

export default function ProjectTimeline() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const milestones: Milestone[] = [
    {
      id: 'ms-backend',
      icon: 'fa-server',
      status: 'done',
      title: { ru: 'Backend', en: 'Backend' },
      desc: { ru: 'API/БД/realtime/наблюдаемость — production‑ready.', en: 'API/DB/realtime/observability — production‑ready.' },
      targetId: 'progress',
    },
    {
      id: 'ms-design',
      icon: 'fa-palette',
      status: 'wip',
      title: { ru: 'UI/UX дизайн', en: 'UI/UX design' },
      desc: { ru: 'Сейчас: ТЗ + референсы. Дизайна и тестирований продукта пока нет.', en: 'Now: scope + references. No designs and no product testing yet.' },
      targetId: 'design',
    },
    {
      id: 'ms-frontend',
      icon: 'fa-mobile-screen',
      status: 'pending',
      title: { ru: 'Frontend (RN)', en: 'Frontend (RN)' },
      desc: { ru: 'Старт после макетов: экраны, навигация, состояния UI.', en: 'Starts after designs: screens, navigation, UI states.' },
      targetId: 'roadmap',
    },
    {
      id: 'ms-qa',
      icon: 'fa-flask-vial',
      status: 'pending',
      title: { ru: 'QA / Beta', en: 'QA / Beta' },
      desc: { ru: 'После появления интерфейса: чек‑листы и бета для сообщества.', en: 'After the UI exists: checklists and a community beta.' },
      targetId: 'roadmap',
    },
    {
      id: 'ms-release',
      icon: 'fa-flag-checkered',
      status: 'pending',
      title: { ru: 'Release', en: 'Release' },
      desc: { ru: 'Стабильный релиз после итераций UI и тестирования.', en: 'A stable release after UI iterations and testing.' },
      targetId: 'roadmap',
    },
  ]

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.classList.remove('section-hit')
    void el.offsetWidth
    el.classList.add('section-hit')
    window.setTimeout(() => el.classList.remove('section-hit'), 900)
  }

  return (
    <section id="timeline" className="py-14 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title-sm mb-0">{t('Таймлайн проекта', 'Project timeline')}</h3>
              <SectionLinkButton targetId="timeline" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t('Кликайте по шагам, чтобы перейти к релевантной секции.', 'Click a step to jump to the relevant section.')}
            </p>
          </div>

          <ol className="timeline" aria-label={t('Таймлайн проекта', 'Project timeline')}>
            {milestones.map((m, i) => {
              const chip = STATUS_CHIP[m.status]
              return (
                <li key={m.id} className="timeline-item" data-reveal data-reveal-delay={String(i * 80)}>
                  <button type="button" className="timeline-card" onClick={() => go(m.targetId)}>
                    <span className="timeline-dot" aria-hidden="true">
                      <i className={`fa-solid ${m.icon}`}></i>
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-header font-bold text-ink tracking-widest truncate">{m.title[locale]}</div>
                        <span className={chip.className}>
                          <i className="fa-solid fa-circle"></i> {chip[locale]}
                        </span>
                      </div>
                      <div className="text-sm text-ink-light mt-2 leading-relaxed">{m.desc[locale]}</div>
                      <div className="text-xs font-code text-gray-500 mt-3">
                        <i className="fa-solid fa-arrow-right mr-2"></i>
                        {t('Перейти', 'Go')}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

