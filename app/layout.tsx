import { auth } from '@/auth'
import { Toaster } from '@/components/ui/toaster'
import ThemeProvider from '@/contexts/themes.provider'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
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

const AppLayout: FunctionComponent<Readonly<PropsWithChildren>> = async ({
  children
}) => {
  const session = await auth()

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </head>

      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}

export default AppLayout
