import SectionLinkButton from '@/components/SectionLinkButton'

const DOC_LINKS = [
  {
    icon: 'fa-sitemap',
    title: 'ARCHITECTURE',
    desc: 'Слои, границы, realtime, ключевые решения.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/ARCHITECTURE.md',
  },
  {
    icon: 'fa-book',
    title: 'API',
    desc: 'Эндпоинты, форматы, примеры запросов/ответов.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/API.md',
  },
  {
    icon: 'fa-shield-halved',
    title: 'SECURITY/DEV RULES',
    desc: 'Правила разработки и базовая security-гигиена.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/DEVELOPMENT.md',
  },
  {
    icon: 'fa-toggle-on',
    title: 'FEATURE FLAGS',
    desc: 'Safe rollouts и kill switch без redeploy.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/FEATURE_FLAGS.md',
  },
  {
    icon: 'fa-gears',
    title: 'OPERATIONS',
    desc: 'Деплой, мониторинг, бэкапы, окружения.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/OPERATIONS.md',
  },
  {
    icon: 'fa-life-ring',
    title: 'RUNBOOK',
    desc: 'Траблшутинг и типовые операционные сценарии.',
    href: 'https://github.com/batalovmv/l5r/blob/main/docs/RUNBOOK.md',
  },
] as const

export default function DocsLinks() {
  return (
    <section id="docs" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">Документация</h3>
              <SectionLinkButton targetId="docs" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              Короткий доступ к ключевым документам backend репозитория: архитектура, API и эксплуатация.
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              Это не маркетинг — это «как устроено» и «как поддерживается».
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DOC_LINKS.map((doc, i) => (
              <a
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noreferrer"
                className="card p-6 group hover:-translate-y-1 hover:shadow-xl"
                data-reveal
                data-reveal-delay={String(i * 90)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-l5r-red/10 border border-l5r-red/20 flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${doc.icon} text-l5r-red`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="font-header font-bold tracking-widest text-ink group-hover:text-l5r-red">
                      {doc.title}
                    </div>
                    <div className="text-sm text-ink-light mt-1 leading-relaxed">{doc.desc}</div>
                    <div className="text-xs font-code text-gray-500 mt-3">
                      <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>Открыть на GitHub
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

