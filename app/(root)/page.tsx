import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import Link from 'next/link'
import type { ReactElement } from 'react'

const HomePage = (): ReactElement => (
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
    <section className='mt-11'>Local Search</section>
    Home Filters
    <div className='mt-10 flex w-full flex-col gap-6'>
      <p>QUestion Card 1</p>
      <p>QUestion Card 2</p>
      <p>QUestion Card 3</p>
    </div>
  </>
)

export default HomePage
