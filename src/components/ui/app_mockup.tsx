import { useState, useEffect } from "react"
import appLight from "@/assets/app_home_light.png"
import appDark from "@/assets/app_home_dark.png"
import { useTheme } from "../../providers/theme-provider"

function AppMockup() {
  const { theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setResolvedTheme(isDark ? "dark" : "light")
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [theme])

  return (
    <div
      style={{
        position: 'relative',
        /* Ocupa até 280 px mas cede ao pai se este for mais estreito */
        width: 'min(100%, 280px)',
        borderRadius: '32px',
        border: '8px solid var(--border-c)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        background: 'var(--bg3)',
        aspectRatio: '9 / 19.5',
      }}
    >
      <img
        src={resolvedTheme === "dark" ? appDark : appLight}
        alt="Agromotion App Screenshot"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  )
}

export { AppMockup }