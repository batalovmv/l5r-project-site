'use client'

import { useEffect, useState } from 'react'
import { useHints } from '@/contexts/HintsContext'

const NAV_ITEMS = [
  { id: 'progress', label: 'ПРОГРЕСС' },
  { id: 'features', label: 'ФУНКЦИИ' },
  { id: 'achievements', label: 'ДОСТИЖЕНИЯ' },
  { id: 'code', label: 'КОД' },
  { id: 'docs', label: 'ДОКИ' },
  { id: 'demo', label: 'КЛАНЫ' },
  { id: 'tech', label: 'СТЕК' },
  { id: 'roadmap', label: 'ПЛАН' },
] as const

export default function Header() {
  const { hintsActive, toggleHints } = useHints()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<(typeof NAV_ITEMS)[number]['id']>('progress')

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveSectionId(targetId as (typeof NAV_ITEMS)[number]['id'])
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    let raf = 0

    const updateActive = () => {
      raf = 0
      const y = window.scrollY + 140
      let current: (typeof NAV_ITEMS)[number]['id'] | null = null

      for (const item of NAV_ITEMS) {
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
  }, [])

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
              ACTIVE DEVELOPMENT
            </div>
            <div className="hidden md:flex gap-4 text-gray-400">
              <span><i className="fa-solid fa-code-branch text-l5r-gold mr-1"></i> main</span>
              <span><i className="fa-solid fa-tag text-blue-400 mr-1"></i> v0.5.0-alpha</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="lang-toggle hidden sm:flex">
              <button type="button" className="active" aria-label="Русский (активно)">
                🇷🇺 RU
              </button>
              <button type="button" disabled title="EN позже" aria-label="English (soon)">
                🇬🇧 EN
              </button>
            </div>
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
              <span className="hidden sm:inline">Подсказки</span>
            </button>
            <a
              href="https://github.com/batalovmv/l5r"
              className="text-gray-400 hover:text-white"
              aria-label="GitHub репозиторий проекта"
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
        aria-label="Навигация по странице"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer group text-left"
            aria-label="На верх страницы"
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
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSectionId === item.id ? 'page' : undefined}
                className={`nav-link ${activeSectionId === item.id ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-ink/10 bg-white/70 hover:bg-white shadow-sm"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
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
              {NAV_ITEMS.map((item) => {
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
                  {item.label}
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
