// IpcaBadge.tsx
import { useTheme } from '@/theme-provider'
import ipcaColor from '@/assets/ipca_color.png'
import ipcaWhite from '@/assets/ipca_white.png'

export function IpcaBadge() {
  const { theme } = useTheme()

  return (
    <a
      href="https://ipca.pt"
      target="_blank"
      rel="noopener noreferrer"
      className="ipca-badge"
    >
        <img
          src={theme === 'dark' ? ipcaWhite : ipcaColor}
          alt="IPCA"
        />
    </a>
  )
}