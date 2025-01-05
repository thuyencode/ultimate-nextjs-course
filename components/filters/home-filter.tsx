'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../ui/button'

const FILTERS = ['newest', 'popular', 'unanswered', 'recommended'] as const

export const HomeFilter = (): ReactElement => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filterParams = searchParams.get('filter')
  const [active, setActive] = useState(filterParams ?? '')

  const handleOnClick = (filter?: (typeof FILTERS)[number]): void => {
    let newUrl = ''

    if (filter === active) {
      setActive('')

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['filter']
      })
    } else if (filter) {
      setActive(filter)

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: filter
      })
    }

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          className={cn(
            'body-medium rounded-lg px-6 py-3 capitalize shadow-none',
            {
              'bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400':
                active === filter,
              'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300':
                active !== filter
            }
          )}
          onClick={() => {
            handleOnClick(filter)
          }}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}
