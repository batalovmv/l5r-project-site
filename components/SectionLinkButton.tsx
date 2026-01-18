'use client'

import { useState } from 'react'

type CopyState = 'idle' | 'copied' | 'error'

export default function SectionLinkButton({ targetId }: { targetId: string }) {
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
      ? 'Ссылка скопирована'
      : state === 'error'
        ? 'Не удалось скопировать'
        : 'Скопировать ссылку на раздел'

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

