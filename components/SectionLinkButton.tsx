'use client'

import { useState } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

type CopyState = 'idle' | 'copied' | 'error'

export default function SectionLinkButton({ targetId }: { targetId: string }) {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const [state, setState] = useState<CopyState>('idle')

  const handleCopy = async () => {
    try {
      const url = new URL(window.location.href)
      url.hash = targetId
      window.history.replaceState({}, '', url.toString())
      await navigator.clipboard.writeText(url.toString())
      setState('copied')
      window.setTimeout(() => setState('idle'), 1200)
    } catch {
      setState('error')
      window.setTimeout(() => setState('idle'), 1600)
    }
  }

  const label =
    state === 'copied'
      ? t('Ссылка скопирована', 'Link copied')
      : state === 'error'
        ? t('Не удалось скопировать', 'Copy failed')
        : t('Скопировать ссылку на раздел', 'Copy section link')

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`section-link-btn ${state === 'copied' ? 'is-copied' : state === 'error' ? 'is-error' : ''}`}
      aria-label={label}
      title={label}
    >
      <i className={`fa-solid ${state === 'copied' ? 'fa-check' : state === 'error' ? 'fa-triangle-exclamation' : 'fa-link'}`}></i>
    </button>
  )
}
