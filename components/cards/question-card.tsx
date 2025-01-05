import { ASSETS, ROUTES } from '@/constants'
import { getTimeStamp } from '@/lib/utils'
import type { Question } from '@/types/global'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import Metric from '../metric'
import { TagCard } from './tag-card'

interface QuestionCardProps {
  question: Question
}

export const QuestionCard: FunctionComponent<QuestionCardProps> = ({
  question: {
    _id,
    title,
    description,
    tags,
    author,
    createdAt,
    upvotes,
    answers,
    views
  }
}) => (
  <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
    <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
      <div>
        <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
          {getTimeStamp(createdAt)}
        </span>

        <Link href={ROUTES.QUESTION(_id)}>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
            {title}
          </h3>
        </Link>
      </div>
    </div>

    <div className='mt-3.5 flex w-full flex-wrap gap-2'>
      {tags.map((tag) => (
        <TagCard key={tag._id} {...tag} compact />
      ))}
    </div>

    <div className='flex-between mt-6 w-full flex-wrap gap-3'>
      <Metric
        imageProps={{
          src: author.image,
          alt: author.name
        }}
        value={author.name}
        title={`· asked ${getTimeStamp(createdAt)}`}
        href={ROUTES.PROFILE(author._id)}
        textProps={{ className: 'body-medium text-dark400_light700' }}
        isAuthor
      />

      <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
        <Metric
          imageProps={{
            src: ASSETS.LIKE_ICON,
            alt: 'Votes count',
            className: 'mb-1'
          }}
          value={upvotes}
          title='Votes'
          textProps={{
            className: 'small-medium leading-3 text-dark400_light800'
          }}
        />

        <Metric
          imageProps={{
            src: ASSETS.MESSAGE_ICON,
            alt: 'Answers count',
            className: 'mb-1'
          }}
          value={answers}
          title='Answers'
          textProps={{
            className: 'small-medium leading-3 text-dark400_light800'
          }}
        />

        <Metric
          imageProps={{
            src: ASSETS.LIKE_ICON,
            alt: 'Views count',
            className: 'mb-1'
          }}
          value={views}
          title='Views'
          textProps={{
            className: 'small-medium leading-3 text-dark400_light800'
          }}
        />
      </div>
    </div>
  </div>
)
