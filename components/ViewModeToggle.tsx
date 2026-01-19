'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { useViewMode } from '@/contexts/ViewModeContext'

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useViewMode()
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setViewMode('player')}
        aria-pressed={viewMode === 'player'}
        aria-label={t('Режим для игроков', 'Players view')}
        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
          viewMode === 'player'
            ? 'bg-l5r-gold text-white shadow-md'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        <i className="fa-solid fa-gamepad mr-1.5"></i>
        <span className="hidden md:inline">{t('Игрокам', 'Players')}</span>
      </button>
      <button
        type="button"
        onClick={() => setViewMode('developer')}
        aria-pressed={viewMode === 'developer'}
        aria-label={t('Режим для разработчиков', 'Developers view')}
        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
          viewMode === 'developer'
            ? 'bg-tech text-white shadow-md'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        <i className="fa-solid fa-code mr-1.5"></i>
        <span className="hidden md:inline">{t('Разработчикам', 'Developers')}</span>
      </button>
    </div>
  )
}
