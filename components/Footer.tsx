export default function Footer() {
  const books = ['Core Rulebook', 'Emerald Empire', 'Shadowlands', 'Courts of Stone', 'Path of Waves']

  return (
    <footer id="footer" className="bg-ink py-12 text-center border-t-2 border-l5r-gold/40">
      <div className="container mx-auto px-4">
        <div className="font-header text-2xl font-bold text-white mb-2">Project Rokugan</div>
        <p className="text-gray-400 mb-4">Legend of the Five Rings 5th Edition Digital Companion</p>

        {/* Supported Books */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Поддерживаемые книги</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {books.map((book, i) => (
              <span key={i} className="px-2 py-1 bg-success/20 text-success text-xs rounded">
                {book}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="flex justify-center gap-4 mb-6 text-sm">
          <span className="text-gray-400">🇷🇺 Русский</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-500" title="EN позже">🇬🇧 English (soon)</span>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://github.com/batalovmv/l5r"
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="GitHub репозиторий проекта"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        <div className="text-xs text-gray-500 font-code">
          Backend: Node.js + Express + PostgreSQL | Frontend (planned): React Native + Expo
        </div>
        <div className="text-xs text-gray-600 mt-2">
          122 API endpoints • 92 DB tables • 48 services
        </div>
      </div>
    </footer>
  )
}

