import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Progress from '@/components/Progress'
import Features from '@/components/Features'
import Achievements from '@/components/Achievements'
import TechStack from '@/components/TechStack'
import ClansDemo from '@/components/ClansDemo'
import Roadmap from '@/components/Roadmap'
import Footer from '@/components/Footer'

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

