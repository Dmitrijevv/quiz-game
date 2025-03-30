"use client"
import Heading from '@/components/Heading'
import React, { useState, useEffect } from 'react'
import Setting from './setting/Setting'

const MainPage = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem("name");
      setName(storedName); // зберігаємо значення name в стані
    }
  }, []);

  return (
    <div className='p-2'>
      <div><Heading title='Main page'/></div>
      <div className='text-center text-xl text-cyan-900 p-2 font-bold'>
        Hello, {name || 'Guest'}
      </div>
      <div className='flex md:justify-center w-full '>
        <Setting/>
      </div>
    </div>
  )
}

export default MainPage
