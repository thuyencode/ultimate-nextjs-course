/* eslint-disable jsx-a11y/alt-text -- The `alt` prop is already in `imageProps` */
'use client'

import { ASSETS, ROUTES } from '@/constants'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import type { OAuthProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import Image, { type ImageProps } from 'next/image'
import type { ReactElement } from 'react'
import { Button, type ButtonProps } from '../ui/button'

export const SocialAuthForm = (): ReactElement => (
  <div className='mt-10 flex flex-wrap gap-2.5'>
    <SocialAuthButton
      provider='github'
      imageProps={{
        src: ASSETS.GITHUB_ICON,
        alt: "Github's logo",
        className: 'invert-colors'
      }}
      text='Log in with GitHub'
    />

    <SocialAuthButton
      provider='google'
      imageProps={{
        src: ASSETS.GOOGLE_ICON,
        alt: "Google's logo"
      }}
      text='Log in with Google'
    />
  </div>
)

interface SocialAuthButtonProps {
  imageProps: ImageProps
  buttonProps?: Omit<ButtonProps, 'onClick'>
  text: string
  provider: Extract<OAuthProviderType, 'github' | 'google'>
}

function SocialAuthButton({
  imageProps,
  buttonProps,
  text,
  provider
}: SocialAuthButtonProps): ReactElement {
  const handleLogIn = async (): Promise<void> => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: false
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Log in failed',
        description:
          error instanceof Error
            ? error.message
            : 'An error occurred during log in',
        variant: 'destructive'
      })
    }
  }

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        void handleLogIn()
      }}
      className={cn(
        'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5',
        buttonProps?.className
      )}
    >
      <Image
        width={20}
        height={20}
        {...imageProps}
        className={cn('mr-2.5 object-contain', imageProps.className)}
      />

      <span>{text}</span>
    </Button>
  )
}
