import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Progress from '@/components/Progress'

// Lazy load heavy components
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="py-20 text-center"><i className="fa-solid fa-spinner fa-spin text-l5r-red text-2xl"></i></div>
})

const Achievements = dynamic(() => import('@/components/Achievements'), {
  loading: () => <div className="py-16 text-center"><i className="fa-solid fa-spinner fa-spin text-l5r-red text-2xl"></i></div>
})

const TechStack = dynamic(() => import('@/components/TechStack'), {
  loading: () => <div className="py-16 text-center"><i className="fa-solid fa-spinner fa-spin text-l5r-red text-2xl"></i></div>
})

const ClansDemo = dynamic(() => import('@/components/ClansDemo'), {
  loading: () => <div className="py-20 text-center"><i className="fa-solid fa-spinner fa-spin text-l5r-red text-2xl"></i></div>,
  ssr: false // Chart.js needs client-side rendering
})

const Roadmap = dynamic(() => import('@/components/Roadmap'), {
  loading: () => <div className="py-24 text-center"><i className="fa-solid fa-spinner fa-spin text-l5r-red text-2xl"></i></div>
})

const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Progress />
        <Features />
        <Achievements />
        <TechStack />
        <ClansDemo />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}
