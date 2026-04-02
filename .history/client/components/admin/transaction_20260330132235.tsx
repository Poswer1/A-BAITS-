'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import AvatarBlock from "../ui/avatar"
import { getRelativeTime } from "../ui/relativeTime"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const {t} = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start w-full">
            {allTransactions.map(transaction => (
                <div key={transaction._id} className="flex justify-between items-center w-full bg-white border-t border-b border-gray-200 p-2">
                    <div className="flex justify-start items-center gap-2">
                        <img src={transaction.lot.images[0]}/>
                        <div className="flex flex-col justify-center items-start">
                            <span className="text-sm text-gray-500">{transaction.user.name}</span>
                            <h1 className="ml-2">{transaction.lot.name.length > 40 ? transaction.lot.name.slice(0,40) + '...' : transaction.lot.name}</h1>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <span className="text-gray-500">Сумма: <span className="text-black font-bold">{transaction.sum} ₴</span></span>
                        <span className="text-gray-500">Дата: {getRelativeTime(transaction.createdAt, 'ru')}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

