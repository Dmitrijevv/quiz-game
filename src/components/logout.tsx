"use client"
import React from 'react'
import { LogOut } from 'lucide-react'
import {useRouter} from 'next/navigation'

const Logout = () => {
    
  const { push } = useRouter()  // 

   const logout = () => {
    localStorage.removeItem('name')
    push('/')
}
  
  return (
    <div className='p-2'>
      <button onClick={() => logout()}><LogOut size={26}/></button>
    </div>
    
  )
}

export default Logout