'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { createElement, type ReactElement } from 'react'

const THEMES: Array<{ theme: 'light' | 'dark' | 'system'; icon: LucideIcon }> =
  [
    { theme: 'light', icon: Sun },
    { theme: 'dark', icon: Moon },
    { theme: 'system', icon: Monitor }
  ]

const ThemeToggle = (): ReactElement => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />

          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='capitalize' align='end'>
        {THEMES.map(({ theme, icon }) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => {
              setTheme(theme)
            }}
          >
            {createElement(icon, { className: 'transition-all' })}
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
