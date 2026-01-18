import SectionLinkButton from '@/components/SectionLinkButton'

const DELIVERABLES = [
  {
    icon: 'fa-palette',
    title: 'Дизайн‑система',
    items: ['цвета и типографика', 'сетка/отступы', 'иконки/иллюстрации', 'UI kit компонентов'],
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Ключевые экраны',
    items: ['Home / Campaigns', 'Characters list', 'Character sheet', 'Scene/Combat UI'],
  },
  {
    icon: 'fa-layer-group',
    title: 'Состояния UI',
    items: ['loading/empty/error', 'offline режим', 'role: GM/Player', 'permissions/locked'],
  },
  {
    icon: 'fa-route',
    title: 'UX‑флоу',
    items: ['навигация', 'критические сценарии', 'кликабельный прототип', 'handoff для RN'],
  },
] as const

export default function DesignBrief() {
  return (
    <section id="design" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">Дизайн: brief</h3>
              <SectionLinkButton targetId="design" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              Сейчас фронтенд не стартовал: он начинается по готовым макетам и дизайн‑системе.
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              Продуктовые тестирования/бета — после появления UI и кликабельного прототипа.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DELIVERABLES.map((block, i) => (
              <div key={block.title} className="card p-6" data-reveal data-reveal-delay={String(i * 90)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-l5r-gold/10 border border-l5r-gold/25 flex items-center justify-center">
                    <i className={`fa-solid ${block.icon} text-l5r-gold`}></i>
                  </div>
                  <h4 className="font-header font-bold text-lg text-ink">{block.title}</h4>
                </div>
                <ul className="space-y-2 text-sm text-ink-light">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-check text-success mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 card-soft p-6" data-reveal data-reveal-delay="120">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-ink">
                <span className="font-bold">Цель:</span> зафиксировать визуальный стиль и UX‑флоу → после этого собрать RN интерфейс быстро и без переделок.
              </div>
              <a
                href="https://github.com/batalovmv/l5r"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm"
              >
                <i className="fa-brands fa-github"></i>Исходники
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
