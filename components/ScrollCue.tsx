'use client'

import { useLocale } from '@/contexts/LocaleContext'

export default function ScrollCue() {
  const { locale } = useLocale()
  const label = locale === 'ru' ? 'Прокрутите вниз' : 'Scroll down'

  return (
    <div className="scroll-cue" aria-hidden="true">
      <div className="scroll-cue__label">{label}</div>
      <div className="scroll-cue__icon">
        <i className="fa-solid fa-arrow-down"></i>
      </div>
    </div>
  )
}

