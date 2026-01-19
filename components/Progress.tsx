'use client'

import { useLocale } from '@/contexts/LocaleContext'
import SectionLinkButton from '@/components/SectionLinkButton'

export default function Progress() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section id="progress" className="py-14 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="section-title-sm">{t('Сводка прогресса', 'Progress summary')}</h3>
                <SectionLinkButton targetId="progress" />
              </div>
              <div className="section-divider mt-3"></div>
              <p className="section-subtitle mt-3">
                {t(
                  'Коротко и по делу — что реально готово, что в работе, что впереди.',
                  'Short and practical — what’s ready, what’s in progress, what’s next.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="chip chip-done"><i className="fa-solid fa-check"></i> {t('ГОТОВО', 'DONE')}</span>
              <span className="chip chip-wip"><i className="fa-solid fa-gear"></i> {t('В РАБОТЕ', 'IN PROGRESS')}</span>
              <span className="chip chip-pending"><i className="fa-solid fa-circle"></i> {t('ПЛАН', 'PLANNED')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Backend */}
            <div className="card p-6" data-reveal data-reveal-delay="0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-server text-success"></i>
                  <div className="font-header font-bold text-lg">Backend</div>
                </div>
                <span className="chip chip-done">{t('ГОТОВ', 'READY')}</span>
              </div>
              <div className="text-sm text-ink-light mb-4">
                {t('API, БД, realtime, мониторинг — production‑ready.', 'API, DB, realtime, observability — production‑ready.')}
              </div>
              <div className="progress-track mb-2">
                <div
                  className="progress-fill progress-fill-green"
                  style={{ ['--progress' as any]: 0.9, ['--delay' as any]: '0ms' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-code">
                <span>{t('оценка', 'estimate')}</span><span>~90%</span>
              </div>
            </div>

            {/* UI/UX */}
            <div className="card p-6" data-reveal data-reveal-delay="120">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-palette text-l5r-gold"></i>
                  <div className="font-header font-bold text-lg">UI/UX</div>
                </div>
                <span className="chip chip-wip">{t('В РАБОТЕ', 'WIP')}</span>
              </div>
              <div className="text-sm text-ink-light mb-4">
                {t(
                  'Дизайн ещё не готов — сейчас формируется ТЗ и собираются референсы.',
                  'Design is not ready yet — scope and references are being prepared.'
                )}
              </div>
              <div className="progress-track mb-2">
                <div
                  className="progress-fill progress-fill-gold"
                  style={{ ['--progress' as any]: 0.05, ['--delay' as any]: '120ms' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-code">
                <span>{t('оценка', 'estimate')}</span><span>~5%</span>
              </div>
            </div>

            {/* Frontend */}
            <div className="card p-6" data-reveal data-reveal-delay="240">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen text-gray-600"></i>
                  <div className="font-header font-bold text-lg">Frontend</div>
                </div>
                <span className="chip chip-pending">{t('ОЖИДАЕТ', 'PENDING')}</span>
              </div>
              <div className="text-sm text-ink-light mb-4">
                {t(
                  'Разработка ещё не началась — стартую после готового дизайна.',
                  'Development has not started yet — it begins after the design is ready.'
                )}
              </div>
              <div className="progress-track mb-2">
                <div
                  className="progress-fill progress-fill-gray"
                  style={{ ['--progress' as any]: 0, ['--delay' as any]: '240ms' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-code">
                <span>{t('оценка', 'estimate')}</span><span>~0%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 card-soft p-5" data-reveal data-reveal-delay="120">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Сейчас:', 'Now:')}</span>{' '}
                {t(
                  'подготовка UI/UX (ТЗ, референсы) → затем старт фронтенда.',
                  'UI/UX prep (scope, references) → then frontend work.'
                )}
              </div>
              <div className="text-sm font-code text-gray-600">
                {t('200 endpoints • 109 таблиц • 90 сервисов', '200 endpoints • 109 tables • 90 services')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

