'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import AvatarBlock from "../ui/avatar"
import { getRelativeTime } from "../ui/relativeTime"
import Link from "next/link"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const {t} = useTranslation()
    const BASE_URL = process.env.NEXT_PUBLIC_URL

  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start w-full">
            {allTransactions.map(transaction => (
                <div key={transaction._id} className="flex justify-between items-center w-full bg-white border-t border-b border-gray-200 p-2">
                    <div className="flex justify-start items-center gap-2">
                        <img src={`${BASE_URL}${transaction.lot.images[0]}`} className="w-15"/>
                        <div className="flex flex-col justify-center items-start">
                            <Link href={``} className="text-sm text-gray-500">{transaction.user.name}</Link>
                            <h1>{transaction.lot.name.length > 40 ? transaction.lot.name.slice(0,40) + '...' : transaction.lot.name}</h1>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-10">
                        <span className="text-gray-500 text-sm">Сумма: <br /><span className="text-black font-bold text-base">- {transaction.sum} ₴</span></span>
                        <span className="text-gray-500 text-sm">Дата: <br /> <span className="text-black">{getRelativeTime(transaction.createdAt, 'ru')}</span></span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

