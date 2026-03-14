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
      <div className='p-4 bg-gray-400/50 rounded-md'>
        <h1 className='text-gray-200'>Текущий баланс</h1>
      </div>
    </div>
  )
}

export default page
