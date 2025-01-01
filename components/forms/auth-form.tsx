/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- This is fine */
'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ROUTES } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import type { ReactElement } from 'react'
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type SubmitHandler
} from 'react-hook-form'
import type { z, ZodType } from 'zod'
import { Input } from '../ui/input'

interface AuthFormProps<T extends FieldValues> {
  type: 'log-in' | 'register'
  schema: ZodType<T>
  defaultValues: DefaultValues<T>
  onSubmit: (data: T) => Promise<{ success: boolean }>
}

export const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit
}: AuthFormProps<T>): ReactElement => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleSubmit: SubmitHandler<T> = (data) => {
    console.log(data)
  }

  const getButtonText = (): string => {
    switch (type) {
      case 'log-in':
        return form.formState.isSubmitting ? 'Logging in...' : 'Log in'

      case 'register':
        return form.formState.isSubmitting ? 'Registering user...' : 'Register'
    }
  }

  return (
    <Form {...form}>
      <form
        className='mt-10 space-y-6'
        onSubmit={() => {
          void form.handleSubmit(handleSubmit)
        }}
      >
        {Object.keys(defaultValues).map((fieldName) => (
          <FormField
            key={`${type}/${fieldName}`}
            control={form.control}
            name={fieldName as Path<T>}
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-medium text-dark400_light700 capitalize'>
                  {field.name}
                </FormLabel>

                <FormControl>
                  <Input
                    type={field.name === 'password' ? 'password' : 'text'}
                    required
                    {...field}
                    className='paragraph-regular background-light900_dark300 text-dark300_light700 no-focus min-h-12 rounded-1.5 border'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {getButtonText()}
        </Button>

        <p className='paragraph-semibold primary-text-gradient text-center'>
          {type === 'log-in' ? (
            <Link href={ROUTES.REGISTER}>I don&apos;t have an account</Link>
          ) : (
            <Link href={ROUTES.LOG_IN}>I already have an account</Link>
          )}
        </p>
      </form>
    </Form>
  )
}
