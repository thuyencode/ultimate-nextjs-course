import { HomeFilter } from '@/components/filters'
import { LocalSearch } from '@/components/search'
import { Button } from '@/components/ui/button'
import { ASSETS, ROUTES } from '@/constants'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

const QUESTIONS = [
  {
    _id: '1',
    title: 'Best practices for custom hooks in React',
    description:
      "Hi there, I've been learning about React hooks for a while now and just stumbled upon custom hooks pattern. Any suggestions to write production-ready custom hooks?",
    tags: [{ _id: '1', name: 'react' }],
    author: { _id: 1, name: 'Thuyen Code' },
    upvote: 5,
    answers: 2,
    views: 10,
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Solid vs React',
    description: 'What are the pros and cons of Solid.js compared to React?',
    tags: [
      { _id: '1', name: 'react' },
      { _id: '2', name: 'solid' }
    ],
    author: { _id: 1, name: 'Thuyen Code' },
    upvote: 7,
    answers: 4,
    views: 20,
    createdAt: new Date()
  },
  {
    _id: '3',
    title: 'Should I learn Rust as a JS/TS developer?',
    description:
      "JS was my first programming language but honestly it's not my favorite. Recently I've getting into low-level stuff likes how memory actually works and JS abstracts many of those away from me. Just found out about Rust yesterday and it's very hyped. I wanna try but I find its syntaxes are kinda unfamiliar.",
    tags: [{ _id: '6', name: 'rust' }],
    author: { _id: 1, name: 'Thuyen Code' },
    upvote: 100,
    answers: 10,
    views: 125,
    createdAt: new Date()
  },
  {
    _id: '4',
    title: 'Best Linux environment setup for web dev?',
    description:
      'Just migrated from Win to Linux, any suggestions on how to setup a cool dev env likes those of the savvy tech YouTuber?',
    tags: [{ _id: '6', name: 'linux' }],
    author: { _id: 1, name: 'Thuyen Code' },
    upvote: -10,
    answers: 50,
    views: 200,
    createdAt: new Date()
  },
  {
    _id: '5',
    title:
      'Elysia JS is severely underrated! More devs should be using it right now!',
    description:
      'IT HAS EDEN TREATY WHAT ELSE DO YOU NEED ANYMORE UOOOOOOOOOOH?!',
    tags: [
      { _id: '3', name: 'javascript' },
      { _id: '5', name: 'elysia' },
      { _id: '8', name: 'nodejs' }
    ],
    author: { _id: 1, name: 'Thuyen Code' },
    upvote: 6969,
    answers: 69,
    views: 6969,
    createdAt: new Date()
  }
] as const

interface HomePageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

const HomePage: FunctionComponent<HomePageProps> = async ({ searchParams }) => {
  const { query = '', filter = '' } = await searchParams

  const filteredQuestions = QUESTIONS.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase())

    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true

    return matchesQuery && matchesFilter
  })

  return (
    <>
      <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

        <Button
          className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'
          asChild
        >
          <Link href={ROUTES.ASK}>Ask a question</Link>
        </Button>
      </section>

      <section className='mt-11'>
        <LocalSearch
          imgSrc={ASSETS.SEARCH_ICON}
          placeholder='Search questions...'
          route='/'
        />
      </section>

      <HomeFilter />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  )
}

export default HomePage
