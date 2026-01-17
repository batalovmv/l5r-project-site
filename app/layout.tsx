import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'L5R Project Hub - Legend of the Five Rings Digital Companion',
  description: 'Мобильное приложение для проведения онлайн-сессий по настольной ролевой игре Legend of the Five Rings 5th Edition',
  keywords: ['L5R', 'Legend of the Five Rings', 'TTRPG', 'React Native', 'Node.js'],
  authors: [{ name: 'batalovmv' }],
  openGraph: {
    title: 'L5R Project Hub',
    description: 'Full-stack проект: production-ready backend + мобильное приложение для L5R 5e',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Noto+Serif+JP:wght@300;700&family=Fira+Code:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

