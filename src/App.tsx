import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './hooks'
import { SiteBg } from './components/ui'
import Nav from './components/Nav'
import HeadHero, { HeadHeroStatic } from './components/HeadHero'
import ScrollyHero from './components/ScrollyHero'
import StaticHero from './components/StaticHero'
import Brief from './components/Brief'
import Compare from './components/Compare'
import Scenarios from './components/Scenarios'
import CostStory from './components/CostStory'
import Carousel from './components/Carousel'
import Law from './components/Law'
import World from './components/World'
import Practice from './components/Practice'
import Problems from './components/Problems'
import Contractor from './components/Contractor'
import Picker from './components/Picker'
import Sources from './components/Sources'
import Footer from './components/Footer'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis()
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // smooth-scroll to #id links (nav, buttons) through Lenis
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: id === 'top' || id === 'models' ? 0 : -64 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="relative isolate bg-black">
      <SiteBg />
      <Nav />
      {reducedMotion ? <HeadHeroStatic /> : <HeadHero />}
      {reducedMotion ? <StaticHero /> : <ScrollyHero />}
      <Brief />
      <Compare />
      <Scenarios />
      <CostStory />
      <Carousel />
      <Law />
      <World />
      <Practice />
      <Problems />
      <Contractor />
      <Picker />
      <Sources />
      <Footer />
    </div>
  )
}
