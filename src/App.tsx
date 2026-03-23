import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import MobileTopbar from './components/layout/MobileTopbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Team from '@/components/sections/Team'
import Robot from '@/components/sections/Robot'
import AppSection from '@/components/sections/AppSection'
import Telemetry from '@/components/sections/Telemetry'
import Academic from '@/components/sections/Academic'
import Repositories from '@/components/sections/Repositories'

export const SECTIONS = [
  'hero', 'about', 'team', 'robot', 'app',
  'telemetry', 'academic', 'repositories',
] as const

export type SectionId = typeof SECTIONS[number]
type Theme = 'dark' | 'light'

export default function App() {
  const [active, setActive] = useState<SectionId>('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')

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

  useEffect(() => {
    const saved = localStorage.getItem('agromotion-theme')
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('agromotion-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={theme + ' app-shell flex min-h-screen'} style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Sidebar active={active} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="app-main" style={{ marginLeft: 0, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar active={active} theme={theme} onToggleTheme={toggleTheme} />
        <MobileTopbar onMenuToggle={() => setMobileMenuOpen((v) => !v)} menuOpen={mobileMenuOpen} theme={theme} onToggleTheme={toggleTheme} />
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
        <footer className="app-footer" style={{
          padding: '32px 40px',
          borderTop: '1px solid var(--border-c)',
          background: 'var(--bg2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap' as const,
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Agromotion</span>
            <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)' }}>v1.0.0</span>
          </div>
          <p style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', textAlign: 'right', lineHeight: 1.7 }}>
            IPCA · Engenharia de Sistemas Informáticos<br />
            Júlio Faria &amp; Miguel Areal · 2025–2026
          </p>
        </footer>
      </div>
    </div>
  )
}