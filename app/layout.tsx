import ThemeProvider from '@/contexts/themes.provider'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { FunctionComponent, PropsWithChildren } from 'react'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['vietnamese']
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space_grotesk',
  subsets: ['vietnamese']
})

export const metadata: Metadata = {
  title: 'DevOverflow',
  description: 'NOT better than Stack Overflow'
}

const RootLayout: FunctionComponent<Readonly<PropsWithChildren>> = ({
  children
}) => (
  <html lang='en' suppressHydrationWarning>
    <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
