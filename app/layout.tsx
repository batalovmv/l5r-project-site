import type { Metadata } from 'next'
import './globals.css'
import { HintsProvider } from '@/contexts/HintsContext'
import ScrollEffects from '@/components/ScrollEffects'
import BackToTop from '@/components/BackToTop'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LocaleProvider } from '@/contexts/LocaleContext'
import Script from 'next/script'
import SkipLink from '@/components/SkipLink'
import ScrollProgress from '@/components/ScrollProgress'
import HeroPointerGlow from '@/components/HeroPointerGlow'

const SITE_URL = 'https://batalovmv.github.io/l5r-project-site/'

export const metadata: Metadata = {
  title: 'L5R Project Hub - Legend of the Five Rings Digital Companion',
  description:
    'Project hub for the Legend of the Five Rings 5e digital companion: backend ready, UI/UX design pending, frontend planned',
  keywords: ['L5R', 'Legend of the Five Rings', 'TTRPG', 'React Native', 'Node.js'],
  authors: [{ name: 'batalovmv' }],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: 'favicon.svg',
  },
  openGraph: {
    title: 'L5R Project Hub',
    description: 'Full-stack project: production-ready backend + mobile app (in development) for L5R 5e',
    type: 'website',
    url: SITE_URL,
    siteName: 'Project Rokugan',
    images: [
      {
        url: 'og.png',
        width: 1200,
        height: 630,
        alt: 'Project Rokugan — L5R Project Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L5R Project Hub',
    description: 'Full-stack project: production-ready backend + mobile app (in development) for L5R 5e',
    images: ['og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
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
        <ThemeProvider>
          <LocaleProvider>
            <HintsProvider>
              <SkipLink />
              {children}
              <ScrollEffects />
              <ScrollProgress />
              <HeroPointerGlow />
              <BackToTop />
            </HintsProvider>
          </LocaleProvider>
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ? (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN })}
          />
        ) : null}
      </body>
    </html>
  )
}

