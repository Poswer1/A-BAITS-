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
      </Link>
    </div>
  )
}

export default page
