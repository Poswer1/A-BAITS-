import React from 'react'
import transaction from '../admin/transaction'
import { getRelativeTime } from '../ui/relativeTime'
import Link from 'next/dist/client/link'
import { TransactionTypes } from '@/types/types'
import { useParams } from 'next/dist/client/components/navigation'
import { useTranslation } from '@/app/context/TranslationProvider'

interface TransactionCardProps {
    transaction: TransactionTypes
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    
    const {t} = useTranslation()
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const lang = params.lang as string
  
    return (
   <div key={transaction._id} className="flex justify-between items-center w-full bg-white border-t border-b border-gray-200 p-2">
       <div className="flex justify-start items-center gap-2">
            <Link href={`/${lang}/lot/${transaction.lot.lotNumber}`}>
                <img src={`${BASE_URL}${transaction.lot.images[0]}`} className="w-15"/>
            </Link>

            <div className="flex flex-col justify-center items-start">
                <Link href={`/${lang}/profile/${transaction.user.name}`} className="text-sm text-gray-500">{transaction.user.name}</Link>
                <h1>{transaction.lot.name.length > 40 ? transaction.lot.name.slice(0,40) + '...' : transaction.lot.name}</h1>
            </div>
        </div>
        <div className="flex justify-start items-center gap-10">
            <span className="text-gray-500 text-sm">{transaction.type === 'deposit' ? t('admin', 'deposit') : t('admin', 'withdrawal')}: <br /><span className="text-black font-bold text-base">- {transaction.sum} ₴</span></span>
            <span className="text-gray-500 text-sm">Дата: <br /> <span className="text-black">{getRelativeTime(transaction.createdAt, 'ru')}</span></span>
        </div>
    </div>
  )
}
