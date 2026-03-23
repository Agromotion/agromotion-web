import type { SectionId } from '@/App'
import logo from '@/assets/logo.png'
import {
  Home, Info, Users, GraduationCap,
  Cpu, Smartphone, Activity, Github, GitBranch,
  type LucideIcon,
} from 'lucide-react'

interface NavItem { id: SectionId; label: string; Icon: LucideIcon }
interface NavGroup { group: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    group: 'Projeto',
    items: [
      { id: 'hero',     label: 'Início',             Icon: Home },
      { id: 'about',    label: 'Sobre o Projeto',   Icon: Info },
      { id: 'team',     label: 'Equipa',             Icon: Users },
      { id: 'academic', label: 'Contexto Académico', Icon: GraduationCap },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { id: 'robot',     label: 'robô / Firmware',  Icon: Cpu },
      { id: 'app',       label: 'Aplicação Flutter', Icon: Smartphone },
      { id: 'telemetry', label: 'Telemetria',        Icon: Activity },
    ],
  },
  {
    group: 'Código',
    items: [
      { id: 'repositories', label: 'Repositórios', Icon: GitBranch },
    ],
  },
]

const S = {
  aside: {
    width: 220, position: 'fixed' as const, top: 0, left: 0, bottom: 0,
    background: 'var(--bg2)', borderRight: '1px solid var(--border-c)',
    display: 'flex', flexDirection: 'column' as const, zIndex: 100, overflow: 'hidden',
  },
  brand: { padding: '24px 20px 20px', borderBottom: '1px solid var(--border-c)' },
  logoRow: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 },
  logoImg: { width: 28, height: 28, objectFit: 'contain' as const, flexShrink: 0 },
  brandName: { fontSize: 15, fontWeight: 600, color: 'var(--foreground)' },
  meta: { fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' },
  nav: { flex: 1, padding: '16px 12px', overflowY: 'auto' as const },
  groupLabel: {
    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' as const,
    color: 'var(--text3)', fontFamily: 'DM Mono, monospace',
    padding: '0 8px', marginBottom: 6, marginTop: 18, display: 'block',
  },
  groupLabelFirst: {
    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' as const,
    color: 'var(--text3)', fontFamily: 'DM Mono, monospace',
    padding: '0 8px', marginBottom: 6, marginTop: 0, display: 'block',
  },
  footer: { padding: '16px 20px', borderTop: '1px solid var(--border-c)' },
  footerA: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 12, color: 'var(--text3)', textDecoration: 'none',
    padding: '7px 10px', borderRadius: 8,
  },
}

function NavLink(props: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  const base: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 8,
    fontSize: 13, textDecoration: 'none', cursor: 'pointer',
    marginBottom: 2, transition: 'background .15s, color .15s',
    color: props.active ? 'var(--green)' : 'var(--text2)',
    background: props.active ? 'var(--green-m)' : 'transparent',
  }
  return (
    <a href={'#' + props.item.id} style={base} className={props.active ? 'sidebar-link is-active' : 'sidebar-link'} onClick={props.onNavigate}>
      <props.item.Icon size={14} style={{ flexShrink: 0 }} />
      {props.item.label}
    </a>
  )
}

interface SidebarProps {
  active: SectionId
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ active, isOpen, onClose }: SidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu"
        className={isOpen ? 'sidebar-backdrop is-open' : 'sidebar-backdrop'}
        onClick={onClose}
      />
      <aside style={S.aside} className={isOpen ? 'sidebar is-open' : 'sidebar'}>
        <div style={S.brand} className="sidebar-brand">
          <div style={S.logoRow}>
            <img src={logo} alt="Agromotion" style={S.logoImg} />
            <span style={S.brandName}>Agromotion</span>
          </div>
          <div style={S.meta}>IPCA · 2025–26</div>
        </div>

        <nav style={S.nav} className="sidebar-nav">
          {NAV.map((group, gi) => (
            <div key={group.group}>
              <span style={gi === 0 ? S.groupLabelFirst : S.groupLabel}>{group.group}</span>
              <div>
                {group.items.map((item) => (
                  <NavLink key={item.id} item={item} active={active === item.id} onNavigate={onClose} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div style={S.footer} className="sidebar-footer">
          <a href="https://github.com/Agromotion" target="_blank" rel="noreferrer" style={S.footerA} className="sidebar-footer-link" onClick={onClose}>
            <Github size={13} style={{ flexShrink: 0, fill: 'currentColor' }} />
            Agromotion no GitHub
          </a>
        </div>
      </aside>
    </>
  )
}