import Navbar from '@/components/navigation/navbar'
import type { FunctionComponent, PropsWithChildren } from 'react'

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <main>
    <Navbar />

    {children}
  </main>
)

export default RootLayout
