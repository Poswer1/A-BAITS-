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
    <div className='flex justify-start items-center w-full'>
      <div className='p-4 bg-white rounded-md'>
        <h1 className='text-gray-500'>Текущий баланс: <br/><span className='text-black text-xl'>50 ₴</span></h1>
      </div>
    </div>
  )
}

export default page
