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
    <div className={`${blockClass}`}>
      

      <Link href='https://send.monobank.ua/3Y9bBHwR4q' className='relative text-center'>
        <QRCode value={qrValue} size={200} className={`${animationOpacity}`}/>
        <h1 className='bg-[#0F0F0F] p-2 rounded-b-xl text-white' onClick={(e) => e.preventDefault()}>4545 4545 5454 5444</h1>
      </Link>
    </div>
  )
}

export default page
