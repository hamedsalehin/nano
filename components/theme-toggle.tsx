'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLight = theme === 'light'

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="relative p-2 rounded-md hover:bg-secondary/50 transition-colors"
      aria-label="Toggle theme"
    >
      {isLight ? (
        <Moon className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
      ) : (
        <Sun className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
      )}
    </button>
  )
}
