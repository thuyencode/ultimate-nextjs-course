'use client'

import { AuthForm } from '@/components/forms'
import { LogInSchema } from '@/lib/validations'
import type { ReactElement } from 'react'

const LogInPage = (): ReactElement => (
  <AuthForm
    type='log-in'
    schema={LogInSchema}
    defaultValues={{ email: '', password: '' }}
    onSubmit={async (data) => await Promise.resolve({ success: true, data })}
  />
)

export default LogInPage
