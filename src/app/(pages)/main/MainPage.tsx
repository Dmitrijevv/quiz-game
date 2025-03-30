"use client"
import Heading from '@/components/Heading'
import React from 'react'
import Setting from './setting/Setting'

const MainPage = () => {
  return (
    <div className='p-2'>
      <div><Heading title='Main page'/></div>
      <div className='text-center text-xl text-cyan-900 p-2 font-bold'>Hello, {localStorage.getItem("name")}</div>
      <div className='flex md:justify-center  w-full '>
        <Setting/>
      </div>
    </div>
  )
}

export default MainPage