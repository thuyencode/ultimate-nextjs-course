import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['vietnamese']
})

const space_grotesk = Space_Grotesk({
  variable: '--font-space_grotesk',
  subsets: ['vietnamese']
})

export const metadata: Metadata = {
  title: 'DevOverflow',
  description: 'NOT better than Stack Overflow'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${space_grotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
