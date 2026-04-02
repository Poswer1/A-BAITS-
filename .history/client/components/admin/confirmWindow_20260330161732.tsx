import { overlay } from '@/styles/global'
import React from 'react'

export default function ConfirmWindow() {
  return (
    <div className={overlay}>
      <div className='flex justify-center items-center bg-white p-10 w-1/3 rounded-xl'>
        <h1></h1>
      </div>
    </div>
  )
}

