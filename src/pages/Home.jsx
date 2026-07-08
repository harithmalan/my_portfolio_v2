import { Suspense } from 'react'
import Nav from '../components/Nav'
import HUDFrame from '../components/HUDFrame'
import CustomCursor from '../components/CustomCursor'
import SmoothScroll from '../components/SmoothScroll'
import AmbientBackground from '../components/AmbientBackground'
import AssetErrorBoundary from '../components/AssetErrorBoundary'
import AmbientBirds3D from '../components/three/AmbientBirds3D'
import BackgroundMusic from '../components/BackgroundMusic'
import FloatingActions from '../components/FloatingActions'
import PageLoader from '../components/PageLoader'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Education from '../sections/Education'
import Reviews from '../sections/Reviews'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative cursor-none">
        <PageLoader />
        <AmbientBackground />
        <AssetErrorBoundary>
          <Suspense fallback={null}>
            <AmbientBirds3D />
          </Suspense>
        </AssetErrorBoundary>
        <div className="noise" />
        <CustomCursor />
        <HUDFrame />
        <Nav />
        <BackgroundMusic />
        <FloatingActions />
        <div className="relative z-10">
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Reviews />
          <Contact />
        </div>
      </div>
    </SmoothScroll>
  )
}
