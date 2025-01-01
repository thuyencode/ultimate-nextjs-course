import { SocialAuthForm } from '@/components/forms'
import { ASSETS } from '@/constants'
import Image from 'next/image'
import type { FunctionComponent, PropsWithChildren } from 'react'

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <main className='flex min-h-dvh items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark'>
    <section className='light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8'>
      <div className='flex items-center justify-between gap-2'>
        <div className='space-y-2.5'>
          <h2 className='h2-bold text-dark100_light900'>Join DevFlow</h2>

          <p className='paragraph-regular text-dark500_light400'>
            To get your questions answered
          </p>
        </div>

        <Image
          className='object-contain'
          src={ASSETS.SITE_LOGO}
          alt="DevFlow's logo"
          width={50}
          height={50}
        />
      </div>

      {children}

      <SocialAuthForm />
    </section>
  </main>
)

export default AuthLayout
