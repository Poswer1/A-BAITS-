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
import { animationScale } from '@/styles/style'

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
          <div className={`${animationScale} flex flex-col justify-center items-center p-10 w-1/3 bg-white rounded-xl gap-2`} onClick={(e) => e.stopPropagation()}>
          <span className='text-black text-center'>Переведите сумму пополнения по QR-коду или по номеру карты</span>
          <span className='text-gray-500'>В описание укажите свой email или имя</span>
          <Link className='p-5 bg-gray-100 rounded-xl shadow-md'>
            <QRCode value={qrValue} size={200}/>
          </Link>
          <span>4444 4444 4444 4444</span>
          <p className='text-gray-500'>Деньги поступят на баланс в течении 24 часов</p>
          </div>
        </div>
      )}
    </div>
  )
}

