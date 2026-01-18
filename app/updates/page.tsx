'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import SectionLinkButton from '@/components/SectionLinkButton'
import Notice from '@/components/Notice'
import { ACCESS_REQUEST_URL } from '@/lib/links'
import { UPDATES, type UpdateEntry, type UpdateTag } from '@/lib/updates'

function tagInfo(tag: UpdateTag) {
  const map: Record<UpdateTag, { ru: string; en: string; icon: string }> = {
    ux: { ru: 'UX', en: 'UX', icon: 'fa-wand-magic-sparkles' },
    docs: { ru: 'ДОКИ', en: 'DOCS', icon: 'fa-book' },
    security: { ru: 'SECURITY', en: 'SECURITY', icon: 'fa-shield-halved' },
    i18n: { ru: 'RU/EN', en: 'RU/EN', icon: 'fa-language' },
    deploy: { ru: 'DEPLOY', en: 'DEPLOY', icon: 'fa-rocket' },
    content: { ru: 'КОНТЕНТ', en: 'CONTENT', icon: 'fa-pen' },
  }
  return map[tag]
}

function matchesQuery(update: UpdateEntry, q: string, locale: 'ru' | 'en') {
  if (!q) return true
  const hay = [
    update.id,
    update.date,
    update.version ?? '',
    update.title[locale],
    update.summary[locale],
    ...(update.points ? update.points[locale] : []),
    update.tags.join(' '),
  ]
    .join('\n')
    .toLowerCase()
  return hay.includes(q)
}

export default function UpdatesPage() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<UpdateTag | 'all'>('all')

  const tags = useMemo(() => {
    const all = new Set<UpdateTag>()
    UPDATES.forEach((u) => u.tags.forEach((tg) => all.add(tg)))
    return Array.from(all.values())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return UPDATES.filter((u) => (tag === 'all' ? true : u.tags.includes(tag))).filter((u) => matchesQuery(u, q, locale))
  }, [locale, query, tag])

  return (
    <>
      <section className="hero-surface relative py-16 px-4 overflow-hidden border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
        <div className="kanji-watermark text-[16rem] top-0 text-ink select-none">更</div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-l5r-gold/10 border border-l5r-gold/25 rounded-full text-xs font-code font-bold text-l5r-gold mb-6 shadow-sm">
              <i className="fa-solid fa-clock-rotate-left"></i>
              {t('ИСТОРИЯ ИЗМЕНЕНИЙ', 'CHANGELOG')}
            </div>
            <h2 className="font-header text-4xl md:text-5xl font-bold text-ink mb-4">{t('Updates (публично)', 'Updates (public)')}</h2>
            <p className="font-body text-lg text-ink-light max-w-2xl mx-auto leading-relaxed">
              {t(
                'Короткие релиз‑ноты без приватных деталей. Для доступа к полной истории backend — запросите доступ.',
                'Short release notes without private details. For full backend history — request access.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-ink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-4 max-w-2xl mx-auto mb-10" data-reveal>
              <div className="card-soft p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/70 border border-ink/10 flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('Поиск по updates…', 'Search updates…')}
                    className="w-full bg-transparent outline-none font-bold text-ink placeholder:text-gray-500"
                    aria-label={t('Поиск по обновлениям', 'Search updates')}
                  />
                  {query.trim() ? (
                    <button
                      type="button"
                      className="px-3 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 text-sm font-bold"
                      onClick={() => setQuery('')}
                    >
                      {t('Очистить', 'Clear')}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setTag('all')}
                  className={`px-3 py-2 rounded-full border text-xs font-code font-bold tracking-widest ${
                    tag === 'all' ? 'bg-l5r-red text-white border-l5r-red/30' : 'bg-white/70 border-ink/10 text-ink/70 hover:border-l5r-red/20 hover:text-l5r-red'
                  }`}
                >
                  {t('ВСЕ', 'ALL')}
                </button>
                {tags.map((tg) => {
                  const active = tag === tg
                  const lbl = tagInfo(tg)
                  return (
                    <button
                      key={tg}
                      type="button"
                      onClick={() => setTag(tg)}
                      className={`px-3 py-2 rounded-full border text-xs font-code font-bold tracking-widest inline-flex items-center gap-2 ${
                        active ? 'bg-l5r-red text-white border-l5r-red/30' : 'bg-white/70 border-ink/10 text-ink/70 hover:border-l5r-red/20 hover:text-l5r-red'
                      }`}
                    >
                      <i className={`fa-solid ${lbl.icon}`}></i>
                      {lbl[locale]}
                    </button>
                  )
                })}
              </div>

              <Notice compact variant="info" icon="fa-lock" className="max-w-2xl mx-auto">
                <div className="text-xs font-code text-gray-600">
                  {t(
                    'Безопасность: здесь нет хостов/ключей/секретов. Полный backend changelog — приватный.',
                    'Security: no hosts/keys/secrets here. Full backend changelog is private.'
                  )}
                </div>
              </Notice>
            </div>

            <div className="grid gap-6">
              {filtered.map((u, i) => (
                <div key={u.id} id={u.id} className="card p-6" data-reveal data-reveal-delay={String(i * 90)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="font-header font-bold text-xl text-ink">{u.title[locale]}</div>
                        <div className="text-xs font-code text-gray-500">{u.date}</div>
                        {u.version ? <div className="text-xs font-code text-gray-500">{u.version}</div> : null}
                      </div>
                      <div className="text-sm text-ink-light mt-2 leading-relaxed">{u.summary[locale]}</div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {u.tags.map((tg) => {
                          const lbl = tagInfo(tg)
                          return (
                            <span key={tg} className="px-3 py-1 rounded-full bg-paper-dark text-xs font-code font-bold text-ink/70 border border-ink/10 inline-flex items-center gap-2">
                              <i className={`fa-solid ${lbl.icon} text-l5r-red`}></i>
                              {lbl[locale]}
                            </span>
                          )
                        })}
                      </div>
                      {u.points ? (
                        <ul className="mt-4 space-y-2 text-sm text-ink-light">
                          {u.points[locale].map((p) => (
                            <li key={p} className="flex items-start gap-2">
                              <i className="fa-solid fa-check text-success mt-0.5"></i>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <SectionLinkButton targetId={u.id} />
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-8 text-center" data-reveal data-reveal-delay="120">
                <div className="card-soft p-6 max-w-2xl mx-auto">
                  <div className="font-header font-bold text-lg text-ink">{t('Ничего не найдено', 'No results')}</div>
                  <div className="text-sm text-ink-light mt-2">{t('Попробуйте другой запрос или сбросьте фильтры.', 'Try another query or reset filters.')}</div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <button type="button" className="px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm" onClick={() => { setQuery(''); setTag('all') }}>
                      {t('Сбросить', 'Reset')}
                    </button>
                    <Link href="/" className="px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                      <i className="fa-solid fa-arrow-left mr-2"></i>
                      {t('На главную', 'Home')}
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-10" data-reveal data-reveal-delay="180">
              <Notice
                variant="info"
                icon="fa-lock"
                title={t('Backend: доступ по запросу', 'Backend: access on request')}
                actions={
                  <>
                    <a href={ACCESS_REQUEST_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                      <i className="fa-solid fa-lock"></i>
                      {t('Запросить доступ', 'Request access')}
                    </a>
                    <Link href="/docs/" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-ink/10 bg-white hover:bg-gray-50 font-bold text-sm">
                      <i className="fa-solid fa-book"></i>
                      {t('Публичные доки', 'Public docs')}
                    </Link>
                  </>
                }
              >
                {t('Если нужен полный OpenAPI/Runbook/Changelog — выдаётся read‑only доступ.', 'If you need full OpenAPI/Runbook/Changelog — read‑only access can be granted.')}
              </Notice>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
