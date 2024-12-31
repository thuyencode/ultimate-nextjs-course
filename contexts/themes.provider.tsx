'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { FunctionComponent } from 'react'

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>

export default ThemeProvider
