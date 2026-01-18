'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

export type DocsTocItem = {
  id: string
  label: { ru: string; en: string }
  icon?: string
}

export default function DocsShell({ toc, children }: { toc: DocsTocItem[]; children: ReactNode }) {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const items = useMemo(() => toc.map((i) => ({ ...i, text: i.label[locale] })), [locale, toc])
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (items.length === 0) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    if (reduceMotion) {
      setActiveId(elements[0]!.id)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0]
        if (visible?.target) setActiveId((visible.target as HTMLElement).id)
      },
      { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.classList.remove('section-hit')
    void el.offsetWidth
    el.classList.add('section-hit')
    window.setTimeout(() => el.classList.remove('section-hit'), 900)
  }

  return (
    <div className="docs-shell">
      <div className="docs-shell__mobile" data-reveal>
        <details className="docs-shell__details">
          <summary className="docs-shell__summary">
            <i className="fa-solid fa-list mr-2"></i>
            {t('На этой странице', 'On this page')}
          </summary>
          <div className="docs-shell__list">
            {items.map((item) => (
              <button key={item.id} type="button" className="docs-shell__link" onClick={() => go(item.id)}>
                {item.icon ? <i className={`fa-solid ${item.icon} mr-2 text-l5r-gold`}></i> : null}
                {item.text}
              </button>
            ))}
          </div>
        </details>
      </div>

      <div className="docs-shell__main">{children}</div>

      <aside className="docs-shell__toc" aria-label={t('Оглавление', 'Table of contents')}>
        <div className="docs-shell__tocCard">
          <div className="docs-shell__tocTitle">{t('На этой странице', 'On this page')}</div>
          <div className="docs-shell__tocLinks">
            {items.map((item) => {
              const active = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`docs-shell__tocLink ${active ? 'is-active' : ''}`}
                  onClick={() => go(item.id)}
                >
                  {item.icon ? <i className={`fa-solid ${item.icon} mr-2 ${active ? 'text-l5r-red' : 'text-gray-500'}`}></i> : null}
                  {item.text}
                </button>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}

