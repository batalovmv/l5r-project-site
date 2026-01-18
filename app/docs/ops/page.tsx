'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL } from '@/lib/links'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'

export default function OpsDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'deploy', icon: 'fa-rocket', label: { ru: 'Деплой', en: 'Deploy' } },
    { id: 'health', icon: 'fa-heart-pulse', label: { ru: 'Проверки', en: 'Health checks' } },
    { id: 'observability', icon: 'fa-chart-line', label: { ru: 'Метрики и трейсинг', en: 'Metrics & tracing' } },
    { id: 'backups', icon: 'fa-database', label: { ru: 'Бэкапы и миграции', en: 'Backups & migrations' } },
  ]

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">運</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ink/5 border border-ink/10 rounded-full text-xs font-code font-bold text-ink mb-6 shadow-sm">
              <i className="fa-solid fa-gears"></i>
              {t('OPS', 'OPS')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Ops (lite)', 'Ops (lite)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Общий подход к эксплуатации, без конкретных окружений, адресов и секретов.',
                'Operational approach without specific environments, hosts, or secrets.'
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
                <div id="deploy" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-rocket text-l5r-red mr-2"></i>
                    {t('Деплой', 'Deploy')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('CI quality gate: формат, линт, контракт, тесты', 'CI quality gate: format, lint, contract, tests')}</li>
                    <li>• {t('Повторяемые сборки и окружения через переменные', 'Repeatable builds and environments via variables')}</li>
                  </ul>
                </div>

                <div id="health" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-heart-pulse text-success mr-2"></i>
                    {t('Проверки', 'Health checks')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('/health и /ready для оркестратора', '/health and /ready for orchestrators')}</li>
                    <li>• {t('Readiness учитывает зависимости (по необходимости)', 'Readiness accounts for dependencies when needed')}</li>
                  </ul>
                </div>

                <div id="observability" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-chart-line text-l5r-gold mr-2"></i>
                    {t('Метрики и трейсинг', 'Metrics & tracing')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Prometheus metrics для SLO/алертов', 'Prometheus metrics for SLOs/alerts')}</li>
                    <li>• {t('OpenTelemetry для поиска узких мест', 'OpenTelemetry for bottleneck analysis')}</li>
                  </ul>
                </div>

                <div id="backups" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-database text-tech mr-2"></i>
                    {t('Бэкапы и миграции', 'Backups & migrations')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Бэкапы БД как регулярная операция', 'DB backups as a routine operation')}</li>
                    <li>• {t('Миграции применяются предсказуемо и контролируемо', 'Migrations applied predictably and controlled')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Runbook:', 'Runbook:')}</span>{' '}
                {t('пошаговые инструкции и плейбуки — в приватном репозитории.', 'step-by-step procedures and playbooks live in the private repo.')}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/docs/" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                  <i className="fa-solid fa-arrow-left"></i>
                  {t('К оглавлению', 'Back to docs')}
                </Link>
                <a href={ACCESS_REQUEST_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                  <i className="fa-solid fa-lock"></i>
                  {t('Запросить доступ', 'Request access')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
