'use client'

import { useId, type ReactNode } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import { GLOSSARY, type GlossaryKey } from '@/lib/glossary'

export default function GlossaryTerm({ term, children }: { term: GlossaryKey; children?: ReactNode }) {
  const { locale } = useLocale()
  const id = useId()

  const text = GLOSSARY[term]?.[locale] ?? ''
  const label = children ?? term

  return (
    <span className="glossary-term" tabIndex={0} aria-describedby={id} title={text}>
      {label}
      <span id={id} role="note" className="glossary-tooltip">
        {text}
      </span>
    </span>
  )
}

