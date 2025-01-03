import { Button } from '@/components/ui/button'
import { ASSETS, ROUTES } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { NavLinks } from '../navbar'

export const LeftSidebar = (): ReactElement => (
  <section className='custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-dvh flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
    <div className='flex flex-1 flex-col gap-6'>
      <NavLinks />
    </div>

    <div className='flex flex-col gap-3'>
      <Button
        className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
        asChild
      >
        <Link href={ROUTES.LOG_IN}>
          <Image
            src={ASSETS.ACCOUNT_ICON}
            alt='Account'
            width={20}
            height={20}
            className='invert-colors lg:hidden'
          />
          <span className='primary-text-gradient max-lg:hidden'>Log In</span>
        </Link>
      </Button>

      <Button
        className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'
        asChild
      >
        <Link href={ROUTES.REGISTER}>
          <Image
            src={ASSETS.REGISTER_ICON}
            alt='Account'
            width={20}
            height={20}
            className='invert-colors lg:hidden'
          />
          <span className='max-lg:hidden'>Sign Up</span>
        </Link>
      </Button>
    </div>
  </section>
)
