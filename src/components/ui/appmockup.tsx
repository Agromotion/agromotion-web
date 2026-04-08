import { useState, useEffect } from "react"
import appLight from "@/assets/app_home_light.png"
import appDark from "@/assets/app_home_dark.png"
import { useTheme } from "../../theme-provider"

function AppMockup() {
  const { theme } = useTheme()
  // Criamos um estado local para forçar o componente a atualizar
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Função para verificar qual é o tema que está aplicado no HTML
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setResolvedTheme(isDark ? "dark" : "light")
    }

    // Atualiza logo no início
    updateTheme()

    // Observador para detetar quando a classe no <html> muda (pelo ThemeProvider)
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [theme]) // Depender do theme do contexto ajuda a disparar o efeito

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '280px',
      margin: '0 auto',
      borderRadius: '32px',
      border: '8px solid var(--border-c)',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      background: 'var(--bg3)',
      aspectRatio: '9/19.5'
    }}>
      <img 
        src={resolvedTheme === "dark" ? appDark : appLight} 
        alt="Agromotion App Screenshot"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          // Uma transição suave para não ser um corte seco
          transition: 'all 0.5s ease-in-out'
        }}
      />
    </div>
  )
}

export { AppMockup }