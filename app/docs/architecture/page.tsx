'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'
import GlossaryTerm from '@/components/GlossaryTerm'

export default function ArchitectureDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'layers', icon: 'fa-layer-group', label: { ru: 'Слои и границы', en: 'Layers & boundaries' } },
    { id: 'realtime', icon: 'fa-tower-broadcast', label: { ru: 'Realtime', en: 'Realtime' } },
    { id: 'data', icon: 'fa-database', label: { ru: 'Данные и модель', en: 'Data & model' } },
    { id: 'observability', icon: 'fa-chart-line', label: { ru: 'Наблюдаемость', en: 'Observability' } },
  ]

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">構</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-gold/10 border border-l5r-gold/25 rounded-full text-xs font-code font-bold text-l5r-gold mb-6 shadow-sm">
              <i className="fa-solid fa-sitemap"></i>
              {t('АРХИТЕКТУРА', 'ARCHITECTURE')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Архитектура (публично)', 'Architecture (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Коротко: как устроен backend и почему он “production-ready”, без инфраструктурных деталей.',
                'A concise view of how the backend is built and why it’s production-ready, without infra details.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-ink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <DocsShell toc={toc}>
              <div className="grid md:grid-cols-2 gap-6">
                <div id="layers" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-layer-group text-l5r-red mr-2"></i>
                      {t('Слои и границы', 'Layers & boundaries')}
                    </span>
                    <SectionLinkButton targetId="layers" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Routes → Controllers → Services → Repositories', 'Routes → Controllers → Services → Repositories')}</li>
                    <li>• {t('Бизнес-логика в сервисах, доступ к данным изолирован', 'Business logic in services, data access isolated')}</li>
                    <li>• {t('Валидация входа и единый формат ошибок', 'Input validation and a consistent error envelope')}</li>
                  </ul>
                </div>

                <div id="realtime" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-tower-broadcast text-tech mr-2"></i>
                      {t('Realtime', 'Realtime')}
                    </span>
                    <SectionLinkButton targetId="realtime" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('SSE для клиентов', 'SSE for clients')}</li>
                    <li>• {t('Pub/Sub шина для multi-instance доставки', 'Pub/Sub bus for multi-instance delivery')}</li>
                    <li>• {t('События сцены/кампании как “event stream”', 'Scene/campaign events as an “event stream”')}</li>
                  </ul>
                </div>

                <div id="data" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-database text-success mr-2"></i>
                      {t('Данные и модель', 'Data & model')}
                    </span>
                    <SectionLinkButton targetId="data" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('PostgreSQL + Prisma ORM', 'PostgreSQL + Prisma ORM')}</li>
                    <li>• {t('Сложная доменная схема под L5R 5e', 'A rich domain schema for L5R 5e')}</li>
                    <li>
                      •{' '}
                      {locale === 'ru' ? (
                        <>
                          <GlossaryTerm term="Idempotency">Идемпотентность</GlossaryTerm> для критичных операций
                        </>
                      ) : (
                        <>
                          <GlossaryTerm term="Idempotency">Idempotency</GlossaryTerm> for critical operations
                        </>
                      )}
                    </li>
                  </ul>
                </div>

                <div id="observability" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-chart-line text-l5r-gold mr-2"></i>
                      {t('Наблюдаемость', 'Observability')}
                    </span>
                    <SectionLinkButton targetId="observability" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Метрики и health/ready эндпоинты', 'Metrics and health/ready endpoints')}</li>
                    <li>• {t('Трассировка (OpenTelemetry)', 'Tracing (OpenTelemetry)')}</li>
                    <li>• {t('Логи с корреляцией (request id)', 'Correlated logs (request id)')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Детали:', 'Details:')}</span>{' '}
                {t('подробнее будет добавлено по мере развития проекта.', 'more will be published as the project evolves.')}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/docs/" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                  <i className="fa-solid fa-arrow-left"></i>
                  {t('К оглавлению', 'Back to docs')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
