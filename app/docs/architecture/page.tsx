'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'

export default function ArchitectureDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'layers', icon: 'fa-layer-group', label: { ru: 'Модули и границы', en: 'Modules & boundaries' } },
    { id: 'offline', icon: 'fa-wifi-slash', label: { ru: 'Оффлайн-ядро', en: 'Offline core' } },
    { id: 'data', icon: 'fa-database', label: { ru: 'Данные и модель', en: 'Data & model' } },
    { id: 'portability', icon: 'fa-file-export', label: { ru: 'Экспорт и перенос', en: 'Export & portability' } },
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
                'Коротко: как устроено оффлайн‑ядро приложения и данные, без инфраструктурных деталей.',
                'A concise view of the offline app core and data model, without infrastructure details.'
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
                      {t('Модули и границы', 'Modules & boundaries')}
                    </span>
                    <SectionLinkButton targetId="layers" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('UI → Use-cases → Rules → Storage', 'UI → Use-cases → Rules → Storage')}</li>
                    <li>• {t('Правила и расчёты — чистые функции', 'Rules and calculations are pure functions')}</li>
                    <li>• {t('Хранилище изолировано от UI-слоя', 'Storage is isolated from the UI layer')}</li>
                  </ul>
                </div>

                <div id="offline" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-wifi-slash text-tech mr-2"></i>
                      {t('Оффлайн-ядро', 'Offline core')}
                    </span>
                    <SectionLinkButton targetId="offline" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Работает без интернета и серверов', 'Works without internet or servers')}</li>
                    <li>• {t('Вся логика выполняется на устройстве', 'All logic runs on the device')}</li>
                    <li>• {t('Данные не покидают устройство', 'Data never leaves the device')}</li>
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
                    <li>• {t('Справочники L5R структурированы и локальны', 'L5R reference data is structured and local')}</li>
                    <li>• {t('Единые идентификаторы для персонажей и кампаний', 'Stable identifiers for characters and campaigns')}</li>
                    <li>• {t('Версионирование форматов для безопасных обновлений', 'Versioned formats for safe updates')}</li>
                  </ul>
                </div>

                <div id="portability" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-file-export text-l5r-gold mr-2"></i>
                      {t('Экспорт и перенос', 'Export & portability')}
                    </span>
                    <SectionLinkButton targetId="portability" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('PDF/JSON экспорт для переноса', 'PDF/JSON export for transfer')}</li>
                    <li>• {t('Импорт из файлов без облака', 'File-based import without any cloud')}</li>
                    <li>• {t('Прозрачный контроль над данными', 'Transparent control over data')}</li>
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
