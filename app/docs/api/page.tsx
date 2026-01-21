'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'

export default function ApiDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'storage', icon: 'fa-hard-drive', label: { ru: 'Локальное хранение', en: 'Local storage' } },
    { id: 'versioning', icon: 'fa-diagram-project', label: { ru: 'Версии данных', en: 'Data versioning' } },
    { id: 'domain', icon: 'fa-users', label: { ru: 'Кампании и персонажи', en: 'Campaigns & characters' } },
    { id: 'exports', icon: 'fa-file-export', label: { ru: 'Экспорт', en: 'Export' } },
  ]

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">法</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-tech/10 border border-tech/25 rounded-full text-xs font-code font-bold text-tech mb-6 shadow-sm">
              <i className="fa-solid fa-book"></i>
              {t('ДАННЫЕ', 'DATA')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Данные и хранение (публично)', 'Data & storage (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Главные принципы локального хранения: форматы, версии и перенос данных.',
                'Key principles of local storage: formats, versioning, and data transfer.'
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
                <div id="storage" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-hard-drive text-l5r-red mr-2"></i>
                      {t('Локальное хранение', 'Local storage')}
                    </span>
                    <SectionLinkButton targetId="storage" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Все данные хранятся на устройстве', 'All data is stored on the device')}</li>
                    <li>• {t('Работает без интернета и сервера', 'Works without internet or a server')}</li>
                    <li>• {t('Поиск и фильтры работают оффлайн', 'Search and filters work offline')}</li>
                  </ul>
                </div>

                <div id="versioning" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-diagram-project text-tech mr-2"></i>
                      {t('Версии данных', 'Data versioning')}
                    </span>
                    <SectionLinkButton targetId="versioning" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Форматы данных имеют версию', 'Data formats are versioned')}</li>
                    <li>• {t('Обновления не ломают сохранения', 'Updates do not break saves')}</li>
                    <li>• {t('Миграции выполняются локально', 'Migrations run locally')}</li>
                  </ul>
                </div>

                <div id="domain" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-users text-success mr-2"></i>
                      {t('Кампании и персонажи', 'Campaigns & characters')}
                    </span>
                    <SectionLinkButton targetId="domain" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Кампании и сессии хранятся локально', 'Campaigns and sessions are stored locally')}</li>
                    <li>• {t('Персонажи: создание/лист/прогресс', 'Characters: creation/sheet/progression')}</li>
                    <li>• {t('Роли GM/Player для игры за столом', 'GM/Player roles for tabletop play')}</li>
                  </ul>
                </div>

                <div id="exports" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-file-export text-l5r-gold mr-2"></i>
                      {t('Экспорт', 'Export')}
                    </span>
                    <SectionLinkButton targetId="exports" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('PDF лист персонажа для печати', 'Character sheet PDF for printing')}</li>
                    <li>• {t('JSON экспорт для переноса', 'JSON export for transfer')}</li>
                    <li>• {t('Импорт из файла на новом устройстве', 'File-based import on a new device')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Подробности:', 'Details:')}</span>{' '}
                {t('дополним по мере готовности экранов и функций.', 'will be expanded as screens and features are finalized.')}
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
