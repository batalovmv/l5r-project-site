'use client'

import { useHints } from '@/contexts/HintsContext'

export default function Header() {
  const { hintsActive, toggleHints } = useHints()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
              <button className="active">🇷🇺 RU</button>
              <button>🇬🇧 EN</button>
            </div>
            <button
              onClick={toggleHints}
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                hintsActive 
                  ? 'text-l5r-gold border-l5r-gold bg-l5r-gold/10' 
                  : 'border-gray-600 hover:border-l5r-gold hover:text-l5r-gold'
              }`}
            >
              <i className="fa-solid fa-lightbulb"></i>
              <span className="hidden sm:inline">Подсказки</span>
            </button>
            <a href="https://github.com/batalovmv/l5r" className="text-gray-400 hover:text-white">
              <i className="fa-brands fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <nav className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10 shadow-lg select-none">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 bg-l5r-red text-paper flex items-center justify-center font-header text-2xl font-bold rounded-sm border-2 border-ink group-hover:bg-ink group-hover:text-l5r-red shadow-md">
              五
            </div>
            <div>
              <h1 className="font-header text-xl font-bold text-ink uppercase tracking-widest">Project Rokugan</h1>
              <p className="text-xs text-l5r-red font-bold uppercase tracking-wider">L5R 5e Digital Companion</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6 font-header text-sm font-bold tracking-widest text-ink/80">
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, 'features')}
              className="hover:text-l5r-red cursor-pointer"
            >
              ФУНКЦИИ
            </a>
            <a 
              href="#achievements" 
              onClick={(e) => handleNavClick(e, 'achievements')}
              className="hover:text-l5r-red cursor-pointer"
            >
              ДОСТИЖЕНИЯ
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleNavClick(e, 'demo')}
              className="hover:text-l5r-red cursor-pointer"
            >
              КЛАНЫ
            </a>
            <a 
              href="#tech" 
              onClick={(e) => handleNavClick(e, 'tech')}
              className="hover:text-l5r-red cursor-pointer"
            >
              СТЕК
            </a>
            <a 
              href="#roadmap" 
              onClick={(e) => handleNavClick(e, 'roadmap')}
              className="hover:text-l5r-red cursor-pointer"
            >
              ПЛАН
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
