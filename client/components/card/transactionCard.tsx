import React, { useState } from 'react'
import transaction from '../admin/transaction'
import { getRelativeTime } from '../ui/relativeTime'
import Link from 'next/dist/client/link'
import { TransactionTypes } from '@/types/types'
import { useParams } from 'next/dist/client/components/navigation'
import { useTranslation } from '@/app/context/TranslationProvider'
import AvatarBlock from '../ui/avatar'
import { hover } from '@/styles/style'
import ConfirmWindow from '../admin/confirmWindow'
import { moneyReturn } from '@/services/admin/finance'
import { blockObj, textObj } from '@/styles/admin'
import Image from 'next/image'
import { CornerDownLeft, RefreshCcw, RefreshCw } from 'lucide-react'

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

    const [returnMoney, setReturnMoney] = useState(false)

    const handleReturnMoney = async () => {
        try {
            const data = await moneyReturn(transaction._id.toString(), transaction.user._id.toString(), transaction.lot.author.toString(), Number(transaction.sum))
            setTransactions && setTransactions(prev => prev.map(tr => tr._id === transaction._id ? {...tr, status: data.type} : tr))
            setReturnMoney(false)
        } catch (error) {
            console.error('Error returning money:', error)
            alert('Error returning money')
        }
    }

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
                    <Image src={'/images/logo.png'} alt='' width={100} height={100} className='w-full object-cover'/>
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
            </div>
        </div>
        <div className="flex justify-start items-center gap-10 ml-10 md:ml-0">
            <span className={textObj}>Статус: <br /> <span className='text-red-500'>{transaction.status || 'НЕТУ'}</span></span>
            <span className={textObj}>{transaction.type === 'Deposit' ? t('admin', 'deposit') : t('admin', 'withdrawal')}: <br /><span className={`${transaction.status === 'Return' && 'opacity-50'} ${transaction.type === 'Deposit' ? 'text-green-500' : 'text-red-500'} font-bold text-base`}>{transaction.type === 'Deposit' ? '+' : '-'} {transaction.sum} ₴</span></span>
            <span className={textObj}>Дата: <br /> <span className="text-black">{date}</span></span>
            {useFrom === 'admin' && (
             <span onClick={() => setReturnMoney(true)} className={`${hover} p-2 bg-gray-100 rounded-md`}><RefreshCw /></span>
            )}
        </div>
        {returnMoney && (
            <ConfirmWindow title={t('admin', 'confirmReturn')} confirmAction={() => handleReturnMoney()} cancelAction={() => setReturnMoney(false)} />
        )}
    </div>
  )
}
