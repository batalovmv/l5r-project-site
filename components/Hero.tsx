export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden flex flex-col items-center text-center border-b border-ink/5">
      <div className="kanji-watermark text-[20rem] top-0 text-ink select-none">道</div>
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-code font-bold text-amber-600 mb-6 shadow-sm">
          <i className="fa-solid fa-code"></i>
          FULL-STACK PROJECT • PORTFOLIO
        </div>
        <h2 className="font-header text-4xl md:text-6xl font-bold text-ink mb-6">
          Легенда Пяти Колец <br />
          <span className="text-l5r-red">Цифровой Компаньон</span>
        </h2>
        <p className="font-body text-xl text-ink-light mb-6 max-w-2xl mx-auto leading-relaxed">
          Мобильное приложение для проведения онлайн-сессий по настольной ролевой игре{' '}
          <strong>Legend of the Five Rings 5th Edition</strong>. Вместо того чтобы сидеть за одним 
          столом с книгами и листами персонажей, вы можете играть онлайн со смартфона — 
          всё синхронизируется в реальном времени.
        </p>
        <p className="hint-text max-w-xl mx-auto mb-6">
          Демонстрирует навыки: REST API, PostgreSQL, TypeScript, React Native, Docker, CI/CD, real-time системы
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="#features"
            className="px-8 py-3 bg-l5r-red text-white font-header font-bold rounded shadow-lg hover:bg-red-900 transition-transform transform hover:-translate-y-1"
          >
            <i className="fa-solid fa-mobile-screen mr-2"></i>Возможности
          </a>
          <a
            href="#achievements"
            className="px-8 py-3 bg-white text-ink border border-ink font-header font-bold rounded shadow hover:bg-gray-50 transition-colors"
          >
            <i className="fa-solid fa-trophy mr-2"></i>Что сделано
          </a>
        </div>
        {/* Target audience */}
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-user-ninja text-l5r-red mr-1"></i> Мастера (GM)
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-user text-tech mr-1"></i> Игроки
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-graduation-cap text-success mr-1"></i> Новички в L5R
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-star text-l5r-gold mr-1"></i> Ветераны
          </span>
        </div>
      </div>
    </section>
  )
}

