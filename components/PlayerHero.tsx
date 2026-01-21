'use client'

import { useLocale } from '@/contexts/LocaleContext'

export default function PlayerHero() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  return (
    <section className="hero-surface relative py-20 px-4 overflow-hidden min-h-[80vh] flex items-center justify-center border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
      <div className="kanji-watermark text-[18rem] top-0 text-ink select-none">遊</div>
      <div className="relative z-10 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-red/10 border border-l5r-red/20 rounded-full text-xs font-code font-bold text-l5r-red mb-6 shadow-sm">
          <i className="fa-solid fa-dice"></i>
          {t('ДЛЯ ИГРОКОВ L5R 5E', 'FOR L5R 5E PLAYERS')}
        </div>
        <h2 className="font-header text-4xl md:text-6xl font-bold text-ink mb-6">
          {t('Играй в L5R 5e с телефона', 'Play L5R 5e from your phone')}
        </h2>
        <p className="font-body text-xl text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed">
          {t(
            'Забудь про бумажные листы персонажей. Кубики, техники, бой — всё в одном приложении. Работает без интернета.',
            'Forget paper character sheets. Dice, techniques, combat — all in one app. Works offline.'
          )}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#features" className="btn btn-primary">
            <i className="fa-solid fa-mobile-screen mr-2"></i>
            {t('Что умеет приложение', 'What the app can do')}
          </a>
          <a href="#roadmap" className="btn btn-secondary">
            <i className="fa-solid fa-rocket mr-2"></i>
            {t('Когда релиз?', 'When is the release?')}
          </a>
        </div>
      </div>
    </section>
  )
}
