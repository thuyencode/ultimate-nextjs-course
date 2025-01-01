'use client'

import { AuthForm } from '@/components/forms'
import { RegisterSchema } from '@/lib/validations'
import type { ReactElement } from 'react'

const RegisterPage = (): ReactElement => (
  <AuthForm
    type='register'
    schema={RegisterSchema}
    defaultValues={{ email: '', password: '', name: '', username: '' }}
    onSubmit={async (data) => await Promise.resolve({ success: true, data })}
  />
)
export default RegisterPage
