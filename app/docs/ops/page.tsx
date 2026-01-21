'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'

export default function OpsDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'export', icon: 'fa-file-export', label: { ru: 'Экспорт', en: 'Export' } },
    { id: 'import', icon: 'fa-file-import', label: { ru: 'Импорт', en: 'Import' } },
    { id: 'backups', icon: 'fa-box-archive', label: { ru: 'Резервные копии', en: 'Backups' } },
    { id: 'updates', icon: 'fa-arrows-rotate', label: { ru: 'Обновления', en: 'Updates' } },
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
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Экспорт и перенос (публично)', 'Export & portability (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Как переносить данные между устройствами и делать копии, без облачной зависимости.',
                'How to move data between devices and keep backups, without cloud dependency.'
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
                <div id="export" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-file-export text-l5r-red mr-2"></i>
                      {t('Экспорт', 'Export')}
                    </span>
                    <SectionLinkButton targetId="export" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('PDF лист персонажа для печати', 'Character sheet PDF for printing')}</li>
                    <li>• {t('JSON файл для переноса и архива', 'JSON file for transfer and archive')}</li>
                  </ul>
                </div>

                <div id="import" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-file-import text-success mr-2"></i>
                      {t('Импорт', 'Import')}
                    </span>
                    <SectionLinkButton targetId="import" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Импорт из файла на новом устройстве', 'File-based import on a new device')}</li>
                    <li>• {t('Проверка формата перед загрузкой', 'Format check before import')}</li>
                  </ul>
                </div>

                <div id="backups" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-box-archive text-l5r-gold mr-2"></i>
                      {t('Резервные копии', 'Backups')}
                    </span>
                    <SectionLinkButton targetId="backups" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Копии создаются вручную игроком', 'Backups are created manually by the player')}</li>
                    <li>• {t('Файлы остаются локально', 'Files stay local')}</li>
                  </ul>
                </div>

                <div id="updates" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-arrows-rotate text-tech mr-2"></i>
                      {t('Обновления', 'Updates')}
                    </span>
                    <SectionLinkButton targetId="updates" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Форматы данных версионируются', 'Data formats are versioned')}</li>
                    <li>• {t('Миграции выполняются на устройстве', 'Migrations run on the device')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Инструкции:', 'Guide:')}</span>{' '}
                {t('добавим позже по мере готовности функций переноса.', 'will be added as transfer features mature.')}
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
