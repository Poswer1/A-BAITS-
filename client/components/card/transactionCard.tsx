import React from 'react'
import Link from 'next/dist/client/link'
import { TransactionTypes } from '@/types/types'
import { useParams } from 'next/dist/client/components/navigation'
import { useTranslation } from '@/app/context/TranslationProvider'
import AvatarBlock from '../ui/avatar'
import { blockObj, textObj } from '@/styles/admin'
import { ArrowDownCircle, Minus, PlusCircle } from 'lucide-react'

interface TransactionCardProps {
    transaction: TransactionTypes
    setTransactions?: React.Dispatch<React.SetStateAction<TransactionTypes[]>>
    useFrom?: string
}

export default function TransactionCard({ transaction, setTransactions, useFrom}: TransactionCardProps) {
    
    const {t} = useTranslation()
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const lang = params.lang as string

     const date = transaction.createdAt 
            ? new Date(transaction.createdAt).toLocaleDateString('en-CA') 
            : 'Даты нету';

    return (
   <div key={transaction._id} className={`${blockObj}`}>
       <div className="flex justify-start items-center gap-2">
            {transaction.lot ? (
            <Link href={`/${lang}/lot/${transaction.lot.lotNumber}`} className='w-20'>
                <img src={`${BASE_URL}${transaction.lot?.images?.[0]}`} className="w-15 object-cover"/>
            </Link>
            ) : (
                useFrom === 'admin' ? (
                <Link href={`/${lang}/profile/${transaction.user.name}`} className='w-20'>
                    <AvatarBlock avatar={transaction.user.avatar} size='45'/>
                </Link>
                ) : (
                    <div className='w-20'>
                        <span className=' p-2 rounded-md flex justify-center'>
                            {transaction.type === 'Deposit' ? (
                               <PlusCircle className='text-green-500'/>
                            ): (
                                <ArrowDownCircle className='text-red-500'/>
                            )}

                        </span>
                    </div>
                )
            )}

            <div className="flex flex-col justify-center items-start">
                {useFrom === 'admin' && (
                    <Link href={`/${lang}/profile/${transaction.user.name}`} className={`text-sm ${transaction.lot ? 'text-gray-500' : 'text-black'}`}>{transaction.user.name}</Link>
                )}
                {transaction.lot && (
                    <>
                     <h1>{transaction.lot?.name?.length > 40 ? transaction.lot.name.slice(0,40) + '...' : transaction.lot.name}</h1>
                     {useFrom !== 'admin' && (
                       <span className={`text-sm`}>№ <span className='text-orange-600'>{transaction.lot?.lotNumber}</span></span>
                     )}
                    </>
                )}
                {(!transaction.lot) && (
                    <h1 className={transaction.type === 'Deposit' ? 'text-green-500' : 'text-red-500'}>{transaction.type === 'Deposit' ? t('admin', 'deposit') : t('admin', 'withdrawal')}</h1>
                )}
            </div>
        </div>
        <div className="flex justify-start items-center gap-10 ml-10 md:ml-0">
            <span className={textObj}>{transaction.type === 'Deposit' ? t('admin', 'deposit') : t('admin', 'withdrawal')}: <br /><span className={`${transaction.status === 'Return' && 'opacity-50'} ${transaction.type === 'Deposit' ? 'text-green-500' : 'text-red-500'} font-bold text-base`}>{transaction.type === 'Deposit' ? '+' : '-'} {transaction.sum} ₴</span></span>
            <span className={textObj}>Дата: <br /> <span className="text-black">{date}</span></span>
        </div>
    </div>
  )
}
