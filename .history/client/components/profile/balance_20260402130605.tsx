'use client'

import { blockClass } from '@/styles/profile/profile'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'
import { DollarSign, } from 'lucide-react'
import { button, overlay } from '@/styles/global'
import { useTranslation } from '@/app/context/TranslationProvider'

export default function Balance() {
const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;
    const [openQr, setOpenQe] = useState(false)

    const {t} = useTranslation()

  return (
     <div className={`${blockClass} !bg-transparent !p-0` }>
      <div className='p-3 bg-white rounded-lg flex justify-between items-center w-full'>
        <h1 className='text-gray-500'>{t('profile', 'CurrentBalance')}: <br/><span className='text-black text-xl'>50 ₴</span></h1>
        <button onClick={() => setOpenQe(true)} className={`${button}`}><DollarSign />{t('profile', 'replenishBalance')}</button>
      </div>
      <h1>{t('profile', '')}</h1>
      {openQr && (
        <div className={overlay}>
          <div className='flex justify-center items-center p-10 w-1/3 bg-white rounded-xl'>
          </div>
        </div>
      )}
    </div>
  )
}

