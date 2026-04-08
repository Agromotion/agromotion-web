import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import MobileTopbar from '@/components/layout/MobileTopbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Team from '@/components/sections/Team'
import Robot from '@/components/sections/Robot'
import AppSection from '@/components/sections/AppSection'
import Telemetry from '@/components/sections/Telemetry'
import Academic from '@/components/sections/Academic'
import Repositories from '@/components/sections/Repositories'
import { ThemeProvider } from './providers/theme-provider'
import { Footer } from './components/sections/Footer'
import { TelemetryProvider } from './providers/telemetry-provider'


export const SECTIONS = [
  'hero', 'about', 'team', 'robot', 'app',
  'telemetry', 'academic', 'repositories',
] as const

export type SectionId = typeof SECTIONS[number]

export default function App() {
  const [active, setActive] = useState<SectionId>('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const obs: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.35 },
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="agromotion-theme">
      <TelemetryProvider>
      <div className="app-shell flex min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        
        <Sidebar 
          active={active} 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        <div className="app-main" style={{ marginLeft: 0, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          
          <Topbar active={active} />
          
          <MobileTopbar 
            onMenuToggle={() => setMobileMenuOpen((v) => !v)} 
            menuOpen={mobileMenuOpen} 
          />

          <main>
            <Hero />
            <About />
            <Team />
            <Robot />
            <AppSection />
            <Telemetry />
            <Academic />
            <Repositories />
          </main>

          <Footer/>
        </div>
      </div>
      </TelemetryProvider>
    </ThemeProvider>
  )
}