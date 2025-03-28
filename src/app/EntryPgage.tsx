"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
const EntryPgage = () => {

    const [name, setName] = useState<string | ''>('')

    const {push} = useRouter()
 
    const saveName = () => {
        localStorage.setItem('name', name)
        push('/main')
    }
    const isName = (localStorage.getItem('name'))

    if(isName) return push('/main')

  return (
    <div className='flex justify-center items-center mt-[30%] md:mt-[10%]  text-2xl'>
        <div className='w-[80%] md:w-[30%]'>
          <h3>Log in</h3>  
          
          <div className='mt-20 w-full'>
            <p className='text-lg md:text-xl'>For start game, please enter your name</p>
            <form>
              <div className='w-full'>
            <input onChange={e => setName(e.target.value)} className=' p-2 w-full border-2 border-teal-400' type='text' placeholder='Username' /> 
            </div>
          <Button  type='submit' onClick={() => saveName()} 
          className='w-full mt-5 cursor-pointer bg-teal-400 text-white text-xl'>
            Start</Button>   
            </form>
           
          </div>
          
        </div>
        
    </div>
  )
}

export default EntryPgage