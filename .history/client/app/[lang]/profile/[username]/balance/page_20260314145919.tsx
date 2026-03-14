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
    <div className='flex justify-center items-center w-full'>
      <div className=''>

      </div>
    </div>
  )
}

export default page
