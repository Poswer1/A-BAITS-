'use client'

import { blockClass } from '@/styles/profile/profile'
import QRCode from 'react-qr-code'
import { useState } from 'react'
import Link from 'next/link'
import { DollarSign, } from 'lucide-react'
import { button, overlay } from '@/styles/global'
import { useTranslation } from '@/app/context/TranslationProvider'
import { TransactionTypes } from '@/types/types'
import TransactionCard from '../card/transactionCard'

interface BalanceProps {
  allTransaction: TransactionTypes[]
}

export default function Balance({allTransaction}: BalanceProps) {
    const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;
    const [openQr, setOpenQe] = useState(false)

    const {t} = useTranslation()

  return (
     <div className={`flex flex-col w-full gap-5` }>
      <div className='p-3 bg-white rounded-lg flex justify-between items-center w-full'>
        <h1 className='text-gray-500'>{t('profile', 'CurrentBalance')}: <br/><span className='text-black text-xl'>50 ₴</span></h1>
        <button onClick={() => setOpenQe(true)} className={`${button}`}><DollarSign />{t('profile', 'replenishBalance')}</button>
      </div>
      <h1 className='text-xl'>{t('profile', 'transactions')}</h1>
      <div className='flex flex-col'>
        {allTransaction.map((t) => (
          <TransactionCard transaction={t}/>
        ))}
      </div>
      {openQr && (
        <div className={overlay} onClick={() => setOpenQe(false)}>
          <div className=`flex justify-center items-center p-10 w-1/3 bg-white rounded-xl' onClick={(e) => e.stopPropagation()}>
          </div>
        </div>
      )}
    </div>
  )
}

