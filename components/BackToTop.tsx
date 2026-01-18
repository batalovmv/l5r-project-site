'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

export default function BackToTop() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let raf = 0
    const update = () => {
      raf = 0
      setVisible(window.scrollY > 700)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const scrollUp = () => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollUp}
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      aria-label={t('Наверх', 'Back to top')}
      title={t('Наверх', 'Back to top')}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  )
}
