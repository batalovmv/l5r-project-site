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
    { icon: 'fa-flask', name: 'Jest', color: 'text-green-500' },
  ]

  const mobile = [
    { icon: 'fa-react', name: 'React Native', color: 'text-cyan-500', brand: true },
    { icon: 'fa-js', name: 'TypeScript 5.9', color: 'text-yellow-500', brand: true },
    { icon: 'fa-mobile', name: 'Expo 54', color: 'text-purple-500' },
    { icon: 'fa-database', name: 'SQLite', color: 'text-blue-500' },
    { icon: 'fa-store', name: 'Zustand', color: 'text-amber-600' },
    { icon: 'fa-file-code', name: 'React Hook Form', color: 'text-pink-500' },
    { icon: 'fa-shield', name: 'Zod', color: 'text-blue-600' },
    { icon: 'fa-flask', name: 'Jest', color: 'text-green-500' },
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
              <i className="fa-solid fa-gears"></i> {t('Backend', 'Backend')}
            </h4>
            <p className="hint-text mb-4">
              {t(
                'Бэкенд для подготовки справочных данных и миграций; приложение работает оффлайн',
                'Backend for reference data and migrations; the app runs offline'
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

          {/* Mobile */}
          <div className="card p-8" data-reveal data-reveal-delay="120">
            <h4 className="font-header font-bold text-xl mb-6 text-tech flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen"></i> {t('Мобильное приложение', 'Mobile app')}
            </h4>
            <p className="hint-text mb-4">
              {t(
                'React Native + Expo, локальное хранение в SQLite и Zustand для состояния',
                'React Native + Expo, local storage with SQLite and Zustand state'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {mobile.map((tech, i) => (
                <span key={i} className="tech-badge">
                  <i className={`${tech.brand ? 'fa-brands' : 'fa-solid'} ${tech.icon} ${tech.color}`}></i>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
