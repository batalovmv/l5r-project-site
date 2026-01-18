'use client'

import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'

export default function TechStack() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const backend = [
    { icon: 'fa-node-js', name: 'Node.js 20+', color: 'text-green-600', brand: true },
    { icon: 'fa-js', name: 'TypeScript 5.9', color: 'text-yellow-500', brand: true },
    { icon: 'fa-bolt', name: 'Express 5', color: 'text-gray-600' },
    { icon: 'fa-database', name: 'PostgreSQL', color: 'text-blue-600' },
    { icon: 'fa-layer-group', name: 'Prisma ORM', color: 'text-purple-600' },
    { icon: 'fa-key', name: 'JWT/OAuth', color: 'text-yellow-600' },
    { icon: 'fa-tower-broadcast', name: 'SSE', color: 'text-red-500' },
    { icon: 'fa-database', name: 'Redis', color: 'text-red-600' },
    { icon: 'fa-docker', name: 'Docker', color: 'text-blue-400', brand: true },
    { icon: 'fa-flask', name: 'Jest', color: 'text-green-500' },
  ]

  const frontend = [
    { icon: 'fa-react', name: 'React Native', color: 'text-cyan-500', brand: true },
    { icon: 'fa-e', name: 'Expo', color: 'text-black' },
    { icon: 'fa-js', name: 'TypeScript', color: 'text-yellow-500', brand: true },
    { icon: 'fa-route', name: 'React Navigation', color: 'text-purple-500' },
    { icon: 'fa-globe', name: 'i18next', color: 'text-blue-500' },
    { icon: 'fa-flask', name: 'Jest', color: 'text-red-500' },
  ]

  const books = [
    'Core Rulebook',
    'Emerald Empire',
    'Shadowlands',
    'Courts of Stone',
    'Path of Waves',
  ]

  return (
    <section id="tech" className="py-16 bg-paper-dark border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="section-title mb-0">{t('Технологический стек', 'Tech stack')}</h3>
            <SectionLinkButton targetId="tech" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Backend */}
          <div className="card p-8" data-reveal data-reveal-delay="0">
            <h4 className="font-header font-bold text-xl mb-6 text-l5r-red flex items-center gap-2">
              <i className="fa-solid fa-server"></i> Backend
            </h4>
            <p className="hint-text mb-4">
              {t(
                'Production-ready архитектура с Clean Architecture и SOLID принципами',
                'Production-ready architecture with Clean Architecture and SOLID principles'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {backend.map((tech, i) => (
                <span key={i} className="tech-badge">
                  <i className={`${tech.brand ? 'fa-brands' : 'fa-solid'} ${tech.icon} ${tech.color}`}></i>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div className="card p-8" data-reveal data-reveal-delay="120">
            <h4 className="font-header font-bold text-xl mb-6 text-tech flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen"></i> {t('Frontend (planned)', 'Frontend (planned)')}
            </h4>
            <p className="hint-text mb-4">
              {t(
                'Разработка начнётся после готового дизайна (макетов и дизайн‑системы)',
                'Development starts after the design is ready (screens + design system)'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {frontend.map((tech, i) => (
                <span key={i} className="tech-badge">
                  <i className={`${tech.brand ? 'fa-brands' : 'fa-solid'} ${tech.icon} ${tech.color}`}></i>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Supported Books */}
        <div className="mt-12 text-center" data-reveal data-reveal-delay="90">
          <h4 className="font-header font-bold text-xl mb-6 text-ink">
            <i className="fa-solid fa-book text-l5r-gold mr-2"></i>
            {t('Поддерживаемые книги L5R 5e', 'Supported L5R 5e books')}
          </h4>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {books.map((book, i) => (
              <span key={i} className="book-badge supported">
                <i className="fa-solid fa-check-circle text-success"></i>
                {book}
              </span>
            ))}
            <span className="book-badge planned">
              <i className="fa-solid fa-clock text-l5r-gold"></i>
              {t('Дополнительные книги', 'More books planned')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

