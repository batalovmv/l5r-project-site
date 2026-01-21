'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'

export default function SecurityDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'privacy', icon: 'fa-user-shield', label: { ru: 'Приватность', en: 'Privacy' } },
    { id: 'storage', icon: 'fa-hard-drive', label: { ru: 'Локальное хранение', en: 'Local storage' } },
    { id: 'exports', icon: 'fa-file-export', label: { ru: 'Экспорт', en: 'Export' } },
    { id: 'integrity', icon: 'fa-lock', label: { ru: 'Целостность', en: 'Integrity' } },
  ]

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">守</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-success/10 border border-success/25 rounded-full text-xs font-code font-bold text-success mb-6 shadow-sm">
              <i className="fa-solid fa-shield-halved"></i>
              {t('SECURITY', 'SECURITY')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Приватность (публично)', 'Privacy (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Принципы приватности без “инструкций для атаки”: только подходы и гарантии.',
                'Privacy principles without “attack instructions”: only approaches and guarantees.'
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
                <div id="privacy" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-user-shield text-success mr-2"></i>
                      {t('Приватность', 'Privacy')}
                    </span>
                    <SectionLinkButton targetId="privacy" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Никаких серверов и аккаунтов', 'No servers or accounts')}</li>
                    <li>• {t('Данные остаются на устройстве', 'Data stays on the device')}</li>
                    <li>• {t('Работа без интернета по умолчанию', 'Offline by default')}</li>
                  </ul>
                </div>

                <div id="storage" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-hard-drive text-l5r-red mr-2"></i>
                      {t('Локальное хранение', 'Local storage')}
                    </span>
                    <SectionLinkButton targetId="storage" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Файлы сохраняются локально', 'Files are stored locally')}</li>
                    <li>• {t('Никакой облачной синхронизации', 'No cloud sync')}</li>
                    <li>• {t('Импорт только по инициативе игрока', 'Imports only on player action')}</li>
                  </ul>
                </div>

                <div id="exports" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-file-export text-tech mr-2"></i>
                      {t('Экспорт', 'Export')}
                    </span>
                    <SectionLinkButton targetId="exports" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('PDF и JSON — только локально', 'PDF and JSON — local only')}</li>
                    <li>• {t('Перенос через файл, без фоновой отправки', 'Transfer via file, no background upload')}</li>
                  </ul>
                </div>

                <div id="integrity" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-lock text-l5r-gold mr-2"></i>
                      {t('Целостность', 'Integrity')}
                    </span>
                    <SectionLinkButton targetId="integrity" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Проверка формата при импорте', 'Format checks during import')}</li>
                    <li>• {t('Версии данных для безопасных обновлений', 'Data versioning for safe updates')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Детали приватности:', 'Privacy details:')}</span>{' '}
                {t('публичный обзор без “инструкций для атаки”.', 'public overview without “attack instructions”.')}
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
