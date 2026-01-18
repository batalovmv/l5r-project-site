'use client'

import { useLocale } from '@/contexts/LocaleContext'

export default function SkipLink() {
  const { locale } = useLocale()
  const label = locale === 'ru' ? 'К содержимому' : 'Skip to content'

  return (
    <a className="skip-link" href="#main">
      {label}
    </a>
  )
}

