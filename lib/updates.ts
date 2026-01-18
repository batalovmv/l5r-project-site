export type UpdateTag = 'ux' | 'docs' | 'security' | 'i18n' | 'deploy' | 'content'

export type UpdateEntry = {
  id: string
  date: string
  version?: string
  tags: UpdateTag[]
  title: { ru: string; en: string }
  summary: { ru: string; en: string }
  points?: { ru: string[]; en: string[] }
}

export const UPDATES: UpdateEntry[] = [
  {
    id: '2026-01-18-modern-hub',
    date: '2026-01-18',
    version: 'v0.6.0',
    tags: ['ux', 'docs', 'security', 'i18n', 'deploy', 'content'],
    title: { ru: 'Модернизация Project Hub', en: 'Project Hub modernization' },
    summary: {
      ru: 'Сайт стал презентационным: больше UX‑анимаций, публичные доки внутри сайта и аккуратные ограничения по безопасности.',
      en: 'The site became presentation-ready: more UX animations, public docs inside the site, and careful security constraints.',
    },
    points: {
      ru: [
        'Lazy-reveal по скроллу + подсветка секций и copy‑links.',
        'Публичные /docs без ссылок на приватный backend репозиторий.',
        'Тёмная/светлая тема и реальный RU/EN переключатель.',
        'Code walkthrough вместо скриншотов: фрагменты санитизируются (секреты скрыты).',
        'Деплой на GitHub Pages через workflow.',
      ],
      en: [
        'Lazy reveal on scroll + section highlight and copy-links.',
        'Public /docs with no links to the private backend repository.',
        'Light/dark theme and real RU/EN toggle.',
        'Code walkthrough instead of screenshots: snippets are sanitized (secrets masked).',
        'Deploy to GitHub Pages via workflow.',
      ],
    },
  },
  {
    id: 'design-pending',
    date: '2026-01-18',
    tags: ['content'],
    title: { ru: 'Статус: дизайн и UI тестирования', en: 'Status: design and UI testing' },
    summary: {
      ru: 'UI/UX дизайн ещё не готов, поэтому фронтенд не стартовал; продуктовые тестирования начнутся после появления прототипа.',
      en: 'UI/UX design is not ready yet, so frontend hasn’t started; product testing begins after a prototype exists.',
    },
  },
] as const

