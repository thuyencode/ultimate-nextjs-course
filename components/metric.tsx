/* eslint-disable jsx-a11y/alt-text -- This is ok */
import { cn } from '@/lib/utils'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ComponentProps, FunctionComponent } from 'react'

interface MetricProps extends Partial<Pick<LinkProps, 'href'>> {
  title: string
  value: string | number
  isAuthor?: boolean
  imageProps: ImageProps
  textProps: ComponentProps<'p'>
}

const Metric: FunctionComponent<MetricProps> = ({
  value,
  title,
  href,
  isAuthor,
  textProps,
  imageProps
}) => {
  const metricContent = (
    <>
      <Image
        width={20}
        height={20}
        {...imageProps}
        className={cn('rounded-full object-contain', imageProps.className)}
      />

      <p
        {...textProps}
        className={cn('flex items-center gap-1', textProps.className)}
      >
        {value}

        <span
          className={cn('small-regular line-clamp-1', {
            'max-sm:hidden': isAuthor
          })}
        >
          {title}
        </span>
      </p>
    </>
  )

  return href ? (
    <Link className='flex-center gap-1' href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className='flex-center gap-1'>{metricContent}</div>
  )
}

export default Metric
