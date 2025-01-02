import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ASSETS, ROUTES } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import NavLinks from './nav-links'

const MobileNavbar = (): ReactElement => (
  <Sheet>
    <SheetTrigger asChild>
      <Image
        className='invert-colors sm:hidden'
        src={ASSETS.MENU_ICON}
        alt='Menu'
        width={36}
        height={36}
      />
    </SheetTrigger>

    <SheetContent
      className='background-light900_dark200 border-none'
      side='left'
    >
      <SheetHeader className='text-left'>
        <SheetTitle className='hidden'>Mobile navigation</SheetTitle>

        <Link className='flex items-center gap-1' href={ROUTES.HOME}>
          <Image
            src={ASSETS.SITE_LOGO}
            alt="DevFlow's logo"
            width={23}
            height={23}
          />

          <p className='h2-bold font-space_grotesk text-dark-100 dark:text-light-900'>
            Dev<span className='text-primary-500'>Flow</span>
          </p>
        </Link>

        <div className='no-scrollbar flex h-[calc(100dvh-80px)] flex-col justify-between overflow-y-auto'>
          <SheetClose asChild>
            <section className='flex h-full flex-col gap-6 pt-16'>
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href={ROUTES.LOG_IN}>
                <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                  <span className='primary-text-gradient'>Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={ROUTES.REGISTER}>
                <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
                  Register
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
)

export default MobileNavbar
