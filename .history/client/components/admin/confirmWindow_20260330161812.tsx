import { overlay } from '@/styles/global'
import React from 'react'

export default function ConfirmWindow() {
  return (
    <div className={overlay}>
      <div className='flex flex-col justify-center items-center bg-white p-10 w-1/3 rounded-xl'>
        <h1>Вы уверены что хотите сделать это действие?</h1>
        <div className='flex justify-center items-center w-'>

        </div>
      </div>
    </div>
  )
}

