"use client"
import React from 'react'
import EntryPgage from './EntryPgage'
import MainPage from './(pages)/main/MainPage'

const Switcher = () => {

  const isName = localStorage.getItem('name')

  console.log(isName)
  return (
    <div>
      
      <div>{isName ? <MainPage/> : <EntryPgage/> }</div>
      <div>{isName? <button onClick={() => localStorage.removeItem('name')}>Logout</button> : ""}</div>
      
    </div>
  )
}

export default Switcher