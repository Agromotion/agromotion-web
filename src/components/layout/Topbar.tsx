import type { SectionId } from '@/App'
import logo from '@/assets/logo.png'
import { Moon, Sun } from 'lucide-react'

const LINKS: Array<{ id: SectionId; label: string }> = [
  { id: 'hero',         label: 'Início' },
  { id: 'about',        label: 'Projeto' },
  { id: 'team',         label: 'Equipa' },
  { id: 'robot',        label: 'Robô' },
  { id: 'app',          label: 'App' },
  { id: 'telemetry',    label: 'Telemetria' },
  { id: 'academic',     label: 'IPCA' },
  { id: 'repositories', label: 'Código' },
]

function TopLink(props: { id: SectionId; label: string; active: boolean }) {
  return (
    <a
      href={'#' + props.id}
      className={props.active ? 'topbar-link is-active' : 'topbar-link'}
      style={{
        fontSize: 12, color: props.active ? 'var(--green)' : 'var(--text3)',
        textDecoration: 'none', padding: '5px 10px', borderRadius: 6,
        transition: 'color .15s, background .15s', whiteSpace: 'nowrap' as const,
      }}
    >
      {props.label}
    </a>
  )
}

interface TopbarProps {
  active: SectionId
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Topbar({ active, theme, onToggleTheme }: TopbarProps) {
  return (
    <header className="topbar" style={{
      position: 'sticky', top: 0, zIndex: 50,
      height: 52, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px 0 28px',
      background: 'var(--bg2)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-c)',
      gap: 16,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }} className="topbar-brand">
        <img src={logo} alt="Agromotion" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>Agromotion</span>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }} className="topbar-nav">
        {LINKS.map((l) => (
          <TopLink key={l.id} id={l.id} label={l.label} active={active === l.id} />
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }} className="topbar-actions">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            border: '1px solid var(--border-c)',
            background: 'transparent',
            color: 'var(--text2)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <a
          href="https://github.com/Agromotion"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: 'var(--text3)', textDecoration: 'none',
            padding: '5px 12px', borderRadius: 6,
            border: '1px solid var(--border-c)',
            whiteSpace: 'nowrap' as const,
          }}
        >
          GitHub ↗
        </a>
      </div>
    </header>
  )
}