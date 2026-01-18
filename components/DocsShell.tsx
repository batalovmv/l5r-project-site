'use client'

import { useMemo, type ReactNode } from 'react'
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

      <div className="docs-shell__main" data-scroll-progress-root="docs">
        {children}
      </div>
    </div>
  )
}
