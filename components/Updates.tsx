'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

const HUB_UPDATES = {
  ru: [
    { icon: 'fa-wand-magic-sparkles', text: 'Scroll-reveal: элементы появляются по мере скролла.' },
    { icon: 'fa-location-dot', text: 'Навигация: scroll-spy + подсветка активной секции.' },
    { icon: 'fa-link', text: 'Ссылки на секции: копирование URL одним кликом.' },
    { icon: 'fa-file-code', text: 'Видео кода: вместо скриншотов — живые фрагменты из репозитория.' },
    { icon: 'fa-shield-halved', text: 'Сцены кода санитизируются: секреты не публикуются.' },
    { icon: 'fa-sitemap', text: 'Документация: быстрые ссылки на архитектуру/API/операции.' },
  ],
  en: [
    { icon: 'fa-wand-magic-sparkles', text: 'Scroll reveal: elements appear as you scroll.' },
    { icon: 'fa-location-dot', text: 'Navigation: scroll-spy + active section highlight.' },
    { icon: 'fa-link', text: 'Section links: copy URL in one click.' },
    { icon: 'fa-file-code', text: 'Code walkthrough: live snippets instead of screenshots.' },
    { icon: 'fa-shield-halved', text: 'Code scenes are sanitized: no secrets published.' },
    { icon: 'fa-sitemap', text: 'Docs: quick links to architecture/API/ops.' },
  ],
} as const

export default function Updates() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section id="updates" className="py-20 bg-paper-dark border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">{t('Обновления', 'Updates')}</h3>
              <SectionLinkButton targetId="updates" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t(
                'Быстро понять, что улучшилось, и где смотреть полную историю изменений.',
                'A quick view of what changed and where to find the full history.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6" data-reveal data-reveal-delay="0">
              <div className="font-header font-bold text-lg mb-3 text-ink">
                <i className="fa-solid fa-wand-magic-sparkles text-l5r-gold mr-2"></i>
                {t('Что нового в project hub', 'What’s new in the project hub')}
              </div>
              <ul className="space-y-2 text-sm text-ink-light">
                {HUB_UPDATES[locale].map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <i className={`fa-solid ${item.icon} text-l5r-red mt-0.5`}></i>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-delay="120">
              <div className="font-header font-bold text-lg mb-3 text-ink">
                <i className="fa-solid fa-scroll text-l5r-gold mr-2"></i>
                {t('Changelog backend', 'Backend changelog')}
              </div>
              <p className="text-sm text-ink-light mb-4 leading-relaxed">
                {t(
                  'История изменений API и поведения backend — в официальном changelog репозитория.',
                  'API and backend behavior changes are tracked in the repository changelog.'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/batalovmv/l5r/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
                >
                  <i className="fa-solid fa-file-lines mr-2"></i>
                  {t('Открыть CHANGELOG', 'Open CHANGELOG')}
                </a>
                <a
                  href="https://github.com/batalovmv/l5r/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
                >
                  <i className="fa-solid fa-tag mr-2"></i>Releases
                </a>
              </div>
              <p className="hint-text mt-4">
                {t(
                  'Если важен конкретный эндпоинт/поведение — ориентируйтесь на changelog и OpenAPI контракт.',
                  'For specific endpoints/behavior, rely on the changelog and the OpenAPI contract.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
