'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { TransactionTypes } from "@/types/types"
import TransactionCard from "../card/transactionCard"
import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { hover } from "@/styles/style"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import Pagination from "../ui/pagination"
import TitleSection from "./titleSection"


interface TransactionProps {
    allTransactions: TransactionTypes[]
    total: number
    currentPage: number
    currentSort: string
    currentOrder: string
}

export default function Transaction({allTransactions, total, currentPage, currentSort, currentOrder}: TransactionProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [transactions, setTransactions] = useState<TransactionTypes[]>(allTransactions)

    useEffect(() => {
        setTransactions(allTransactions)
    }, [allTransactions])

    const updateUrl = (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      router.push(`${pathname}?${params.toString()}`)
    }

    const handleSort = (field: string) => {
      const newOrder = currentSort === field && currentOrder === 'desc' ? 'asc' : 'desc'
      updateUrl({ sort: field, order: newOrder, page: '1' })
    }

    const SortIcon = ({ field }: { field: string }) => {
      if (currentSort !== field) return <ArrowUpDown size={14} className="text-gray-400"/>
      return currentOrder === 'asc' ? <ArrowUp size={14} className="text-orange-600"/> : <ArrowDown size={14} className="text-orange-600"/>
    }

    const sortButtonClass = `${hover} flex items-center gap-1 px-3 py-1 rounded-md bg-white text-sm whitespace-nowrap shadow-sm`

  return (
    <div className="flex flex-col gap-2 w-full">
        <TitleSection title={t('admin', 'transactions')}/>
        <div className="flex flex-wrap gap-2 px-2 md:px-0">
          <button onClick={() => handleSort('createdAt')} className={sortButtonClass}>
            Дата <SortIcon field="createdAt"/>
          </button>
          <button onClick={() => handleSort('sum')} className={sortButtonClass}>
            Сумма <SortIcon field="sum"/>
          </button>
          <button onClick={() => handleSort('type')} className={sortButtonClass}>
            Тип <SortIcon field="type"/>
          </button>
          <button onClick={() => handleSort('status')} className={sortButtonClass}>
            Статус <SortIcon field="status"/>
          </button>
        </div>
        <div className="flex flex-col justify-start items-start w-full">
            {transactions.map(transaction => (
                <TransactionCard key={transaction._id} transaction={transaction} setTransactions={setTransactions} useFrom="admin"/>
            ))}
        </div>
        <Pagination total={total} maxLot={20}/>
    </div>
  )
}

