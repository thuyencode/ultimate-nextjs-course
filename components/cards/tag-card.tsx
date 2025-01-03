import { ROUTES } from '@/constants'
import { getDeviconClassName } from '@/lib/utils'
import Link from 'next/link'
import type { FunctionComponent, ReactElement } from 'react'
import { Badge } from '../ui/badge'

interface TagCardProps {
  _id: string
  name: string
  questions: number
  showCount?: boolean
  compact?: boolean
}

export const TagCard: FunctionComponent<TagCardProps> = ({
  _id,
  name,
  questions,
  compact,
  showCount
}): ReactElement => (
  <Link className='flex justify-between capitalize' href={ROUTES.TAG(_id)}>
    <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
      <div className='flex-center space-x-2'>
        <i className={`${getDeviconClassName(name)} text-sm`} />
        <span>{name}</span>
      </div>
    </Badge>

    {showCount ? (
      <p className='small-medium text-dark500_light700'>{questions}</p>
    ) : null}
  </Link>
)
