'use client'

import { SheetClose } from '@/components/ui/sheet'
import { SIDEBAR_LINKS } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, type FunctionComponent } from 'react'

const isActiveRoute = (route: string, pathname: string): boolean =>
  (pathname.includes(route) && route.length > 1) || pathname === route

interface NavLinkProps {
  isMobileNav?: boolean
}

export const NavLinks: FunctionComponent<NavLinkProps> = ({ isMobileNav }) => {
  const pathname = usePathname()
  const userId: number | undefined = 1

  return (
    <>
      {SIDEBAR_LINKS.map((item) => {
        const isActive = isActiveRoute(item.route, pathname)

        if (item.route === '/profile') {
          if (!Number.isNaN(userId)) item.route = `${item.route}/${userId}`
          else return null
        }

        const LinkComponent = (
          <Link
            className={cn(
              'flex items-center justify-start gap-4 bg-transparent p-4',
              {
                'primary-gradient rounded-lg text-light-900': isActive,
                'text-dark300_light900': !isActive
              }
            )}
            href={item.route}
            key={item.label}
          >
            <Image
              className={cn({ 'invert-colors': !isActive })}
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
            />

            <p
              className={cn({
                'base-bold': isActive,
                'base-medium': !isActive,
                'max-lg:hidden': !(isMobileNav ?? false)
              })}
            >
              {item.label}
            </p>
          </Link>
        )

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <Fragment key={item.route}>{LinkComponent}</Fragment>
        )
      })}
    </>
  )
}
