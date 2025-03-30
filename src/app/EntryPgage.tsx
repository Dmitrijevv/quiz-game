"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const EntryPgage = () => {
    const [name, setName] = useState<string>('')
    const { push } = useRouter()

    useEffect(() => {
        const isName = localStorage.getItem('name')
        if (isName) {
            push('/main')
        }
    }, [push]) // Виконається після першого рендера

    const saveName = (e: React.FormEvent) => {
        e.preventDefault() // Запобігаємо перезавантаженню сторінки
        localStorage.setItem('name', name)
        push('/main')
    }

    return (
        <div className='flex justify-center items-center mt-[30%] md:mt-[10%] text-2xl'>
            <div className='w-[80%] md:w-[30%]'>
                <h3>Log in</h3>  
                <div className='mt-20 w-full'>
                    <p className='text-lg md:text-xl'>For start game, please enter your name</p>
                    <form onSubmit={saveName}>
                        <div className='w-full'>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                className='p-2 w-full border-2 border-teal-400' 
                                type='text' 
                                placeholder='Username' 
                            /> 
                        </div>
                        <Button 
                            type='submit' 
                            className='w-full mt-5 cursor-pointer bg-teal-400 text-white text-xl'
                        >
                            Start
                        </Button>   
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EntryPgage
