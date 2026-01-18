'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import DocsShell, { type DocsTocItem } from '@/components/DocsShell'
import SectionLinkButton from '@/components/SectionLinkButton'
import GlossaryTerm from '@/components/GlossaryTerm'

export default function SecurityDocPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const toc: DocsTocItem[] = [
    { id: 'validation', icon: 'fa-circle-check', label: { ru: 'Валидация', en: 'Validation' } },
    { id: 'access', icon: 'fa-user-shield', label: { ru: 'Доступ', en: 'Access control' } },
    { id: 'limits', icon: 'fa-gauge-high', label: { ru: 'Ограничения', en: 'Rate limits' } },
    { id: 'observability', icon: 'fa-eye', label: { ru: 'Наблюдаемость', en: 'Observability' } },
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
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Security (публично)', 'Security (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Принципы безопасности без “инструкций для атаки”: только подходы и гарантии.',
                'Security principles without “attack instructions”: only approaches and guarantees.'
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
                <div id="validation" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-circle-check text-success mr-2"></i>
                      {t('Валидация', 'Validation')}
                    </span>
                    <SectionLinkButton targetId="validation" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Схемы для входных данных и понятные ошибки', 'Schema-based input validation and clear errors')}</li>
                    <li>• {t('Запрет “молчаливых” типов и неожиданных полей', 'No silent typing or unexpected fields')}</li>
                  </ul>
                </div>

                <div id="access" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-user-shield text-l5r-red mr-2"></i>
                      {t('Доступ', 'Access control')}
                    </span>
                    <SectionLinkButton targetId="access" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>
                      •{' '}
                      {locale === 'ru' ? (
                        <>
                          Проверки владения данными (защита от <GlossaryTerm term="IDOR">IDOR</GlossaryTerm>)
                        </>
                      ) : (
                        <>
                          Ownership checks (<GlossaryTerm term="IDOR">IDOR</GlossaryTerm> protection)
                        </>
                      )}
                    </li>
                    <li>• {t('Роли GM/Player в кампании и сценах', 'GM/Player roles for campaigns and scenes')}</li>
                  </ul>
                </div>

                <div id="limits" className="card p-6" data-reveal>
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-gauge-high text-tech mr-2"></i>
                      {t('Ограничения', 'Rate limits')}
                    </span>
                    <SectionLinkButton targetId="limits" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Лимиты на API против brute-force и спайков', 'API rate limits against brute-force and spikes')}</li>
                    <li>• {t('Предсказуемые политики и безопасные дефолты', 'Predictable policies and safe defaults')}</li>
                  </ul>
                </div>

                <div id="observability" className="card p-6" data-reveal data-reveal-delay="90">
                  <h3 className="font-header font-bold text-lg text-ink mb-2 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center">
                      <i className="fa-solid fa-eye text-l5r-gold mr-2"></i>
                      {t('Наблюдаемость', 'Observability')}
                    </span>
                    <SectionLinkButton targetId="observability" />
                  </h3>
                  <ul className="text-sm text-ink-light space-y-2">
                    <li>• {t('Метрики/трейсы/логи без утечки секретов', 'Metrics/traces/logs without leaking secrets')}</li>
                    <li>• {t('Ограничение доступа к диагностике в production', 'Restricted access to diagnostics in production')}</li>
                  </ul>
                </div>
              </div>
            </DocsShell>
          </div>

          <div className="max-w-5xl mx-auto mt-8 card-soft p-6" data-reveal data-reveal-delay="180">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">{t('Детали security:', 'Security details:')}</span>{' '}
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
