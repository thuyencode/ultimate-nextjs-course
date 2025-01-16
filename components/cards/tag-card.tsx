import { ASSETS, ROUTES } from '@/constants'
import { getDeviconClassName } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import type { FunctionComponent, MouseEvent, ReactElement } from 'react'
import { Badge } from '../ui/badge'

type TagCardProps = {
  _id: string
  name: string
  compact?: boolean
  remove?: boolean
  isButton?: boolean
  handleRemove?: () => void
} & (
  | {
      showCount?: false
      questions?: never
    }
  | {
      showCount: true
      questions: number
    }
)

export const TagCard: FunctionComponent<TagCardProps> = ({
  _id,
  name,
  questions,
  compact,
  showCount,
  remove,
  isButton,
  handleRemove
}) => {
  const handleOnClick = (e: MouseEvent): void => {
    e.preventDefault()
  }

  const Content: ReactElement = (
    <>
      <Badge className='subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase'>
        <div className='flex-center space-x-2'>
          <i className={`${getDeviconClassName(name)} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove ? (
          <Image
            src={ASSETS.CLOSE_ICON}
            alt='close'
            width={12}
            height={12}
            className='cursor-pointer object-contain invert-0 dark:invert'
            onClick={handleRemove}
          />
        ) : null}
      </Badge>

      {showCount ? (
        <p className='small-medium text-dark500_light700'>{questions}</p>
      ) : null}
    </>
  )

  if (compact) {
    return isButton ? (
      <button onClick={handleOnClick} className='flex justify-between gap-2'>
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className='flex justify-between gap-2'>
        {Content}
      </Link>
    )
  }
}
