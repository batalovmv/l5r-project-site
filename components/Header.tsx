'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useHints } from '@/contexts/HintsContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useLocale } from '@/contexts/LocaleContext'
import { useViewMode } from '@/contexts/ViewModeContext'
import { SITE_REPO_URL } from '@/lib/links'
import ViewModeToggle from '@/components/ViewModeToggle'

const DEVELOPER_NAV_ITEMS = [
  { id: 'progress', label: { ru: 'ПРОГРЕСС', en: 'PROGRESS' } },
  { id: 'features', label: { ru: 'ФУНКЦИИ', en: 'FEATURES' } },
  { id: 'achievements', label: { ru: 'ДОСТИЖЕНИЯ', en: 'DONE' } },
  { id: 'code', label: { ru: 'КОД', en: 'CODE' } },
  { id: 'docs', label: { ru: 'ДОКИ', en: 'DOCS' } },
  { id: 'tech', label: { ru: 'СТЕК', en: 'STACK' } },
  { id: 'roadmap', label: { ru: 'ПЛАН', en: 'ROADMAP' } },
] as const

const PLAYER_NAV_ITEMS = [
  { id: 'features', label: { ru: 'ВОЗМОЖНОСТИ', en: 'FEATURES' } },
  { id: 'roadmap', label: { ru: 'РЕЛИЗ', en: 'RELEASE' } },
  { id: 'faq', label: { ru: 'FAQ', en: 'FAQ' } },
] as const

const DOC_NAV_ITEMS = [
  { href: '/', label: { ru: 'ГЛАВНАЯ', en: 'HOME' } },
  { href: '/docs/', label: { ru: 'ДОКИ', en: 'DOCS' } },
  { href: '/docs/architecture/', label: { ru: 'АРХИТЕКТУРА', en: 'ARCH' } },
  { href: '/docs/api/', label: { ru: 'ДАННЫЕ', en: 'DATA' } },
  { href: '/docs/security/', label: { ru: 'PRIVACY', en: 'PRIVACY' } },
  { href: '/docs/ops/', label: { ru: 'ЭКСПОРТ', en: 'EXPORT' } },
] as const

type HomeNavItem = (typeof DEVELOPER_NAV_ITEMS)[number] | (typeof PLAYER_NAV_ITEMS)[number]
type HomeNavId = HomeNavItem['id']

export default function Header() {
  const pathname = usePathname()
  const pathnameKey = (pathname ?? '').replace(/\/$/, '')
  const isDocs = pathnameKey.startsWith('/docs')
  const { hintsActive, toggleHints } = useHints()
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const { isPlayerMode } = useViewMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<HomeNavId>('progress')

  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const homeNavItems: readonly HomeNavItem[] = isPlayerMode ? PLAYER_NAV_ITEMS : DEVELOPER_NAV_ITEMS

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: HomeNavId) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveSectionId(targetId)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      element.classList.remove('section-hit')
      // Force reflow to restart animation
      void element.offsetWidth
      element.classList.add('section-hit')
      window.setTimeout(() => element.classList.remove('section-hit'), 900)
    }
  }

  useEffect(() => {
    if (isDocs) return
    const ids = homeNavItems.map((item) => item.id)
    if (!ids.includes(activeSectionId)) {
      const nextId = homeNavItems[0]?.id
      if (nextId) setActiveSectionId(nextId)
    }
  }, [activeSectionId, homeNavItems, isDocs])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isDocs) return

    let raf = 0

    const updateActive = () => {
      raf = 0
      const y = window.scrollY + 140
      let current: HomeNavId | null = null

      for (const item of homeNavItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.offsetTop <= y) current = item.id
      }

      if (current) setActiveSectionId(current)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateActive)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateActive()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [homeNavItems, isDocs])

  return (
    <>
      {/* TOP STATUS BAR */}
      <div className="bg-ink text-paper text-xs font-code py-3 border-b-2 border-l5r-gold relative z-50 shadow-md select-none">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 deploy-dot"></span>
              </span>
              {t('АКТИВНАЯ РАЗРАБОТКА', 'ACTIVE DEVELOPMENT')}
            </div>
            <div className="hidden md:flex gap-4 text-gray-400">
              <span><i className="fa-solid fa-code-branch text-l5r-gold mr-1"></i> main</span>
              <span><i className="fa-solid fa-tag text-blue-400 mr-1"></i> v0.5.0-alpha</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ViewModeToggle />
            <div className="lang-toggle hidden sm:flex">
              <button
                type="button"
                className={locale === 'ru' ? 'active' : ''}
                aria-label={t('Русский', 'Russian')}
                aria-pressed={locale === 'ru'}
                onClick={() => setLocale('ru')}
              >
                🇷🇺 RU
              </button>
              <button
                type="button"
                className={locale === 'en' ? 'active' : ''}
                aria-label="English"
                aria-pressed={locale === 'en'}
                onClick={() => setLocale('en')}
              >
                🇬🇧 EN
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t('Переключить тему', 'Toggle theme')}
              className="flex items-center gap-2 px-3 py-1 rounded border border-gray-600 hover:border-l5r-gold hover:text-l5r-gold"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
              <span className="hidden sm:inline">{t('Тема', 'Theme')}</span>
            </button>

            <button
              onClick={toggleHints}
              aria-pressed={hintsActive}
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                hintsActive 
                  ? 'text-l5r-gold border-l5r-gold bg-l5r-gold/10' 
                  : 'border-gray-600 hover:border-l5r-gold hover:text-l5r-gold'
              }`}
            >
              <i className="fa-solid fa-lightbulb"></i>
              <span className="hidden sm:inline">{t('Подсказки', 'Hints')}</span>
            </button>
            <a
              href={SITE_REPO_URL}
              className="text-gray-400 hover:text-white"
              aria-label={t('GitHub репозиторий проекта', 'Project GitHub repository')}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <nav
        className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10 shadow-lg select-none"
        aria-label={t('Навигация по странице', 'Page navigation')}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer group text-left"
            aria-label={t('Наверх', 'Scroll to top')}
            onClick={() => {
              setMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="w-12 h-12 bg-l5r-red text-paper flex items-center justify-center font-header text-2xl font-bold rounded-sm border-2 border-ink group-hover:bg-ink group-hover:text-l5r-red shadow-md">
              五
            </div>
            <div>
              <h1 className="font-header text-xl font-bold text-ink uppercase tracking-widest">Project Rokugan</h1>
              <p className="text-xs text-l5r-red font-bold uppercase tracking-wider">L5R 5e Digital Companion</p>
            </div>
          </button>

          <div className="hidden md:flex space-x-6 font-header text-sm font-bold tracking-widest text-ink/80">
            {isDocs
              ? DOC_NAV_ITEMS.map((item) => {
                  const active = pathnameKey === item.href.replace(/\/$/, '')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`nav-link ${active ? 'nav-link-active' : ''}`}
                    >
                      {item.label[locale]}
                    </Link>
                  )
                })
              : homeNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={activeSectionId === item.id ? 'page' : undefined}
                    className={`nav-link ${activeSectionId === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.label[locale]}
                  </a>
                ))}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-ink/10 bg-white/70 hover:bg-white shadow-sm"
            aria-label={menuOpen ? t('Закрыть меню', 'Close menu') : t('Открыть меню', 'Open menu')}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-ink`}></i>
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            menuOpen ? 'max-h-96 opacity-100 visible pointer-events-auto' : 'max-h-0 opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 pb-4">
            <div className="pt-2 border-t border-ink/10 grid gap-2">
              {isDocs
                ? DOC_NAV_ITEMS.map((item) => {
                    const active = pathnameKey === item.href.replace(/\/$/, '')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`px-4 py-3 rounded-xl bg-white/70 border font-header text-sm font-bold tracking-widest transition-colors ${
                          active
                            ? 'border-l5r-red/30 text-l5r-red bg-l5r-red/5'
                            : 'border-ink/10 text-ink/80 hover:text-l5r-red hover:border-l5r-red/20'
                        }`}
                      >
                        {item.label[locale]}
                      </Link>
                    )
                  })
                : homeNavItems.map((item) => {
                    const active = activeSectionId === item.id
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`px-4 py-3 rounded-xl bg-white/70 border font-header text-sm font-bold tracking-widest transition-colors ${
                          active
                            ? 'border-l5r-red/30 text-l5r-red bg-l5r-red/5'
                            : 'border-ink/10 text-ink/80 hover:text-l5r-red hover:border-l5r-red/20'
                        }`}
                      >
                        {item.label[locale]}
                      </a>
                    )
                  })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
