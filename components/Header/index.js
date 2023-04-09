import React from 'react'
import HamburgerMenu from '../MenuButton'
import Image from 'next/image'
const Header = () => {
  return (
    <div className="px-10 bg-[#cccccc1f] flex justify-between items-center fixed top-0 left-0 right-0 p-8  text-white z-50">
      <div>
        <Image
          alt='logo'
          src='/logo.png'
          width={120}
          height={10}
          className='absolute left-0 top-[-1rem]' 
        />
      </div>
      <div>
        <HamburgerMenu />
      </div>
    </div>
  )
}

export default Header