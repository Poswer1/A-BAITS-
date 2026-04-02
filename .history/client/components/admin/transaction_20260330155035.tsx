'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import AvatarBlock from "../ui/avatar"
import { getRelativeTime } from "../ui/relativeTime"
import Link from "next/link"
import { useParams } from "next/navigation"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const params = useParams()
    const lang = params.lang as string
    const {t} = useTranslation()
    const BASE_URL = process.env.NEXT_PUBLIC_URL

  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start w-full">
            {allTransactions.map(transaction => (
                <TransactionCard key={transaction._id} transaction={transaction}/>
            ))}
        </div>
    </div>
  )
}

