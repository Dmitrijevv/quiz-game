"use client"
import Logout from '@/components/logout'
import React from 'react'

const Header = () => {
  return (
    <div className='flex w-full items-center justify-between h-15 bg-cyan-400 text-white p-3'>
        <div className='text-2xl'>Quiz Game</div>
        <div><Logout/></div>
    </div>
  )
}

export default Header