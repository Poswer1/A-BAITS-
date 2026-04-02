'use client'

import { blockClass } from '@/styles/profile/profile'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'

function page() {
  const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;

  return (
    <div className={blockClass}>
      <div className='p-1 bg-white rounded-lg flex '>
        <h1 className='text-gray-500'>Текущий баланс: <br/><span className='text-black text-xl'>50 ₴</span></h1>
      </div>
    </div>
  )
}

export default page
