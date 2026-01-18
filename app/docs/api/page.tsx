'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL } from '@/lib/links'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'

export default function ApiDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'auth', icon: 'fa-right-to-bracket', label: { ru: 'Авторизация', en: 'Authentication' } },
    { id: 'errors', icon: 'fa-diagram-project', label: { ru: 'Версии и ошибки', en: 'Versioning & errors' } },
    { id: 'domain', icon: 'fa-users', label: { ru: 'Кампании и персонажи', en: 'Campaigns & characters' } },
    { id: 'realtime', icon: 'fa-tower-broadcast', label: { ru: 'Realtime', en: 'Realtime' } },
  ]

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">法</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-tech/10 border border-tech/25 rounded-full text-xs font-code font-bold text-tech mb-6 shadow-sm">
              <i className="fa-solid fa-book"></i>
              {t('API', 'API')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('API обзор (публично)', 'API overview (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Главные принципы API без полного контракта: как авторизоваться, как работать с кампаниями и realtime.',
                'Key API principles without the full contract: auth, campaigns, and realtime usage.'
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
                <div id="auth" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-right-to-bracket text-l5r-red mr-2"></i>
                    {t('Авторизация', 'Authentication')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Guest режим для старта “без регистрации”', 'Guest mode for instant start')}</li>
                    <li>• {t('OAuth вход для привязки аккаунта', 'OAuth sign-in for account linking')}</li>
                    <li>• {t('Access/refresh токены с ротацией (детали — приватно)', 'Access/refresh tokens with rotation (details private)')}</li>
                  </ul>
                </div>

                <div id="errors" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-diagram-project text-tech mr-2"></i>
                    {t('Версии и ошибки', 'Versioning & errors')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Версионирование через /api/v1', 'Versioning via /api/v1')}</li>
                    <li>• {t('Единый формат ответа для успеха/ошибки', 'Consistent success/error envelope')}</li>
                    <li>• {t('Валидация входных данных и понятные коды ошибок', 'Input validation and clear error codes')}</li>
                  </ul>
                </div>

                <div id="domain" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-users text-success mr-2"></i>
                    {t('Кампании и персонажи', 'Campaigns & characters')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Кампании: роли GM/Player', 'Campaigns with GM/Player roles')}</li>
                    <li>• {t('Персонажи: создание/лист/прогресс', 'Characters: creation/sheet/progression')}</li>
                    <li>• {t('Идемпотентность для важных операций', 'Idempotency for critical operations')}</li>
                  </ul>
                </div>

                <div id="realtime" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2">
                    <i className="fa-solid fa-tower-broadcast text-l5r-gold mr-2"></i>
                    {t('Realtime', 'Realtime')}
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('SSE stream для кампании/сцены', 'SSE stream for campaign/scene')}</li>
                    <li>• {t('События как “append-only” лента', 'Events as an append-only feed')}</li>
                    <li>• {t('Стабильная доставка в multi-instance (детали — приватно)', 'Stable multi-instance delivery (details private)')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Полный контракт:', 'Full contract:')}</span>{' '}
                {t('OpenAPI + примеры запросов/ответов — в приватном репозитории.', 'OpenAPI + request/response examples live in the private repo.')}
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
