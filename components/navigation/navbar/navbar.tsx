import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'

const Navbar = (): ReactElement => (
  <nav className='flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12'>
    <Link href='/' className='flex items-center gap-1'>
      <Image
        src='/images/site-logo.svg'
        width={23}
        height={23}
        alt="DevFlow's logo"
      />

      <p className='h2-bold font-space_grotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
        Dev<span className='text-primary-500'>Flow</span>
      </p>
    </Link>

    <p>Global search</p>

    <div className='flex-between gap-5'>Theme</div>
  </nav>
)

export default Navbar
