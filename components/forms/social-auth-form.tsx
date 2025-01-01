import { ASSETS } from '@/constants'
import { cn } from '@/lib/utils'
import Image, { type ImageProps } from 'next/image'
import type { ReactElement } from 'react'
import { Button, type ButtonProps } from '../ui/button'

export const SocialAuthForm = (): ReactElement => (
  <div className='mt-10 flex flex-wrap gap-2.5'>
    <SocialAuthButton
      imageProps={{
        src: ASSETS.GITHUB_ICON,
        alt: "Github's logo",
        className: 'invert-colors'
      }}
      text='Log in with GitHub'
    />

    <SocialAuthButton
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
