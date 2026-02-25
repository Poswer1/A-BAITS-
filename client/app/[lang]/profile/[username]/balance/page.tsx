'use client'

import { blockClass } from '@/styles/profile/profile'
import { animationOpacity} from '@/styles/style'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'
import { Copy } from 'lucide-react'

function page() {
  const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;

  return (
    <div className={`${blockClass} !justify-between !items-start relative`}>
      <div className='flex flex-col justify-center items-start gap-2'>
        <h1>Текущий баланс: <span className='text-xl font-bold'>32.61 ₴</span></h1>
        <span className='font-bold mt-2'>Чтобы пополнить баланс, отправьте деньги:</span>
        <span className='ml-2'>По QR-коду</span>
        <span className='ml-2'>Или на номер карты: <span className='text-orange-600'>4441 1111 4259 9418</span></span>
        <span className='text-gray-500 text-sm'>Минимальная сумма пополнения — 50 ₴.</span>
        <p className='text-sm text-gray-500'>После поступления денег на баланс (в течение 24 часов) вы получите их на свой баланс</p>
      </div>

      <Link href='https://send.monobank.ua/3Y9bBHwR4q' className='relative text-center'>
        <QRCode value={qrValue} size={200} className={`${animationOpacity}`}/>
        <h1 className='bg-[#0F0F0F] p-2 rounded-b-xl text-white' onClick={(e) => e.preventDefault()}>4545 4545 5454 5444</h1>
      </Link>
    </div>
  )
}

export default page
