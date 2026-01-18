import SectionLinkButton from '@/components/SectionLinkButton'

const HUB_UPDATES = [
  { icon: 'fa-wand-magic-sparkles', text: 'Scroll-reveal: элементы появляются по мере скролла.' },
  { icon: 'fa-location-dot', text: 'Навигация: scroll-spy + подсветка активной секции.' },
  { icon: 'fa-link', text: 'Ссылки на секции: копирование URL одним кликом.' },
  { icon: 'fa-file-code', text: 'Техническая витрина: «видео кода» вместо скриншотов.' },
  { icon: 'fa-shield-halved', text: 'Сцены кода санитизируются: секреты не публикуются.' },
  { icon: 'fa-sitemap', text: 'Документация: быстрые ссылки на архитектуру/API/операции.' },
] as const

export default function Updates() {
  return (
    <section id="updates" className="py-20 bg-paper-dark border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">Обновления</h3>
              <SectionLinkButton targetId="updates" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              Быстро понять, что улучшилось, и где смотреть полную историю изменений.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6" data-reveal data-reveal-delay="0">
              <div className="font-header font-bold text-lg mb-3 text-ink">
                <i className="fa-solid fa-wand-magic-sparkles text-l5r-gold mr-2"></i>Что нового в project hub
              </div>
              <ul className="space-y-2 text-sm text-ink-light">
                {HUB_UPDATES.map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <i className={`fa-solid ${item.icon} text-l5r-red mt-0.5`}></i>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-delay="120">
              <div className="font-header font-bold text-lg mb-3 text-ink">
                <i className="fa-solid fa-scroll text-l5r-gold mr-2"></i>Changelog backend
              </div>
              <p className="text-sm text-ink-light mb-4 leading-relaxed">
                История изменений API и поведения backend — в официальном changelog репозитория.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/batalovmv/l5r/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
                >
                  <i className="fa-solid fa-file-lines mr-2"></i>Открыть CHANGELOG
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
                Если важен конкретный эндпоинт/поведение — ориентируйтесь на changelog и OpenAPI контракт.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
