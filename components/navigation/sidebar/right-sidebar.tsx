import { TagCard } from '@/components/cards'
import { ASSETS, ROUTES } from '@/constants'
import type { Question, Tag } from '@/types/global'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'

const TOP_QUESTIONS: Array<Pick<Question, '_id' | 'title'>> = [
  {
    _id: '1',
    title: 'Best practices for custom hooks in React'
  },
  {
    _id: '2',
    title: 'Solid vs React'
  },
  {
    _id: '3',
    title: 'Should I learn Rust as a JS/TS developer?'
  },
  {
    _id: '4',
    title: 'Best Linux environment setup for web dev?'
  },
  {
    _id: '5',
    title: 'Elysia JS is underrated! More devs should be using it right now!'
  }
]

const POPULAR_TAGS: Array<Tag & { questions: number }> = [
  { _id: '1', name: 'react', questions: 2 },
  { _id: '2', name: 'solid', questions: 1 },
  { _id: '3', name: 'javascript', questions: 1 },
  { _id: '4', name: 'typescript', questions: 1 },
  { _id: '5', name: 'elysia', questions: 1 },
  { _id: '6', name: 'rust', questions: 1 },
  { _id: '6', name: 'linux', questions: 1 }
]

export const RightSidebar = (): ReactElement => (
  <section className='custom-scrollbar background-light900_dark200 light-border right-0 top-0 flex h-dvh w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
    <div className=''>
      <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>

      <div className='mt-7 flex w-full flex-col gap-[30px]'>
        {TOP_QUESTIONS.map(({ _id, title }) => (
          <Link
            className='flex cursor-pointer items-center justify-between gap-7'
            href={ROUTES.QUESTION(_id)}
            key={ROUTES.QUESTION(_id)}
          >
            <p className='body-medium text-dark500_light700 first-letter:uppercase'>
              {title}
            </p>

            <Image
              className='invert-colors'
              src={ASSETS.CHEVRON_RIGHT}
              alt='Chevron right'
              width={20}
              height={20}
            />
          </Link>
        ))}
      </div>
    </div>

    <div className='mt-16'>
      <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>

      <div className='mt-7 flex flex-col gap-4'>
        {POPULAR_TAGS.toSorted(
          (prev, next) => next.questions - prev.questions
        ).map((tag) => (
          <TagCard
            key={`${tag._id}/${tag.name}/${tag.questions}`}
            {...tag}
            showCount
            compact
          />
        ))}
      </div>
    </div>
  </section>
)
