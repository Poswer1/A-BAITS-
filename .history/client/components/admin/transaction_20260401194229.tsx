'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import TransactionCard from "../card/transactionCard"
import { useState } from "react"


interface TransactionProps {
    allTransactions: TransactionTypes[]
}

export default function Transaction({allTransactions}: TransactionProps) {

    const {t} = useTranslation()
    const [transactions, setTransactions] = useState<TransactionTypes[]>(allTransactions)

  return (
    <div className="flex flex-col gap-4 w-full">
        <h1 className="text-xl">{t('admin', 'transactions')}</h1>
        <div className="flex flex-col justify-start items-start w-full">
            {transactions.map(transaction => (
                <TransactionCard key={transaction._id} transaction={transaction} setTransactions={setTransactions}/>
            ))}
        </div>
    </div>
  )
}

