'use client'

import { ASSETS, ROUTES } from '@/constants'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import type { OAuthProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import Image, { type ImageProps } from 'next/image'
import type { ReactElement } from 'react'
import { Button, type ButtonProps } from '../ui/button'

export const SocialAuthForm = (): ReactElement => {
  const handleLogIn = async (
    provider: Extract<OAuthProviderType, 'github' | 'google'>
  ): Promise<void> => {
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
    <div className='mt-10 flex flex-wrap gap-2.5'>
      <SocialAuthButton
        imageProps={{
          src: ASSETS.GITHUB_ICON,
          alt: "Github's logo",
          className: 'invert-colors'
        }}
        buttonProps={{
          onClick: () => {
            void handleLogIn('github')
          }
        }}
        text='Log in with GitHub'
      />

      <SocialAuthButton
        imageProps={{
          src: ASSETS.GOOGLE_ICON,
          alt: "Google's logo"
        }}
        buttonProps={{
          onClick: () => {
            void handleLogIn('google')
          }
        }}
        text='Log in with Google'
      />
    </div>
  )
}

interface SocialAuthButtonProps {
  imageProps: ImageProps
  buttonProps?: ButtonProps
  text: string
}

function SocialAuthButton({
  imageProps,
  buttonProps,
  text
}: SocialAuthButtonProps): ReactElement {
  return (
    <Button
      {...buttonProps}
      className={cn(
        'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5',
        buttonProps?.className
      )}
    >
      <Image
        width={20}
        height={20}
        {...imageProps}
        alt={imageProps.alt}
        className={cn('mr-2.5 object-contain', imageProps.className)}
      />

      <span>{text}</span>
    </Button>
  )
}
