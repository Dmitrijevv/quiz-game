"use client"
import React from 'react'

interface IHeading{
    title: string
}
const Heading = ({title}:IHeading) => {
  return (
    <div>
        <h1 className='text-2xl p-1'>{title}</h1>
    </div>
  )
}

export default Heading