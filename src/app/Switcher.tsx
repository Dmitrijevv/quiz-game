"use client"
import React from 'react'
import EntryPgage from './EntryPgage'
import MainPage from './(pages)/main/MainPage'
import { Loader } from 'lucide-react'

const Switcher = () => {

  const isName = localStorage.getItem('name')

  if (isName === undefined || null || '') return <Loader/>
  return (
    <div>
      
      <div>{isName ? <MainPage/> : <EntryPgage/> }</div>
      <div>{isName? <button onClick={() => localStorage.removeItem('name')}>Logout</button> : ""}</div>
      
    </div>
  )
}

export default Switcher