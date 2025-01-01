import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import type { ReactElement } from 'react'

const HomePage = async (): Promise<ReactElement> => {
  const session = await auth()

  console.log(session)

  return (
    <>
      <form
        className='px-10 pt-[100px]'
        action={async () => {
          'use server'
          await signOut({ redirectTo: ROUTES.LOG_IN })
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </>
  )
}

export default HomePage
