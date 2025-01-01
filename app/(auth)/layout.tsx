import type { FunctionComponent, PropsWithChildren } from 'react'

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <main>{children}</main>
)

export default AuthLayout
