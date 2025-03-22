'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun, FiEdit3 } from 'react-icons/fi'
import { useEffect, useState } from 'react'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita erro de hidratação esperando o componente montar
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-3 transition-colors hover:text-primary">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <FiEdit3 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Notepadfy
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="icon-btn glass"
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? (
                  <FiSun className="h-[1.2rem] w-[1.2rem] text-primary" />
                ) : (
                  <FiMoon className="h-[1.2rem] w-[1.2rem] text-primary" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 