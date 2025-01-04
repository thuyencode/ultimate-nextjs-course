'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url'
import { cn } from '@/lib/utils'
import Image, { type ImageProps } from 'next/image'
import type { LinkProps } from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  useEffect,
  useState,
  type ComponentProps,
  type FunctionComponent
} from 'react'
import { Input } from '../ui/input'

interface LocalSearchProps
  extends Pick<ComponentProps<'input'>, 'placeholder' | 'className'> {
  imgSrc: ImageProps['src']
  route: LinkProps['href']
}

export const LocalSearch: FunctionComponent<LocalSearchProps> = ({
  imgSrc,
  route,
  placeholder,
  className
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query']
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => {
      clearTimeout(delayDebounceFn)
    }
  }, [pathname, route, router, searchParams, searchQuery])

  return (
    <div
      className={cn(
        'background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4',
        className
      )}
    >
      <Image
        className='cursor-pointer'
        src={imgSrc}
        alt="Search's icon"
        width={24}
        height={24}
      />

      <Input
        className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none'
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
      />
    </div>
  )
}
