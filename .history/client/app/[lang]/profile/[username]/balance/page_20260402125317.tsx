'use client'

import { blockClass } from '@/styles/profile/profile'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'
import { DollarSign, } from 'lucide-react'
import { button } from '@/styles/global'

function page() {
  const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;
  const [openQr, setOpenQe] = useState(false)

  return (
    <div className={blockClass}>
      <div className='p-1 bg-white rounded-lg flex justify-between items-center w-full'>
        <h1 className='text-gray-500'>Текущий баланс: <br/><span className='text-black text-xl'>50 ₴</span></h1>
        <button onClick={() => setOpenQe()} className={`${button}`}><DollarSign />Пополнить баланс</button>
      </div>
    </div>
  )
}

export default page
