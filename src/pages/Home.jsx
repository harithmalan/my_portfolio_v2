import Nav from '../components/Nav'
import HUDFrame from '../components/HUDFrame'
import CustomCursor from '../components/CustomCursor'
import SmoothScroll from '../components/SmoothScroll'
import AmbientBackground from '../components/AmbientBackground'
import BackgroundMusic from '../components/BackgroundMusic'
import FloatingActions from '../components/FloatingActions'
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
        <AmbientBackground />
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
