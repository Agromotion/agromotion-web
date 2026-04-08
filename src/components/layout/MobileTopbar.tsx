import logo from '@/assets/logo.png'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../../providers/theme-provider' // Ajusta o caminho conforme necessário

interface MobileTopbarProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export default function MobileTopbar({ menuOpen, onMenuToggle }: MobileTopbarProps) {
  // Acedemos ao tema e à função de mudar o tema diretamente do Provider
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className="mobile-topbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 110,
        height: 52,
        display: 'none', // Lembra-te de gerir a visibilidade via CSS Media Queries
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        background: 'var(--bg2)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-c)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <img src={logo} alt="Agromotion" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Agromotion</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Botão de Tema */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          style={{
            width: 34,
            height: 34,
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
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Botão de Menu */}
        <button
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={onMenuToggle}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: '1px solid var(--border-c)',
            background: 'transparent',
            color: 'var(--foreground)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </header>
  )
}