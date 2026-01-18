import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Progress from '@/components/Progress'
import SectionSkeleton from '@/components/SectionSkeleton'

// Lazy load heavy components
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <SectionSkeleton kind="features" />,
})

const Achievements = dynamic(() => import('@/components/Achievements'), {
  loading: () => <SectionSkeleton kind="achievements" />,
})

const CodeShowcase = dynamic(() => import('@/components/CodeShowcase'), {
  loading: () => <SectionSkeleton kind="code" />,
})

const DocsLinks = dynamic(() => import('@/components/DocsLinks'), {
  loading: () => <SectionSkeleton kind="docs" />,
})

const TechStack = dynamic(() => import('@/components/TechStack'), {
  loading: () => <SectionSkeleton kind="tech" />,
})

const ClansDemo = dynamic(() => import('@/components/ClansDemo'), {
  loading: () => <SectionSkeleton kind="demo" />,
  ssr: false // Chart.js needs client-side rendering
})

const Roadmap = dynamic(() => import('@/components/Roadmap'), {
  loading: () => <SectionSkeleton kind="roadmap" />,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <SectionSkeleton kind="footer" />,
})

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Progress />
        <Features />
        <Achievements />
        <CodeShowcase />
        <DocsLinks />
        <TechStack />
        <ClansDemo />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}
