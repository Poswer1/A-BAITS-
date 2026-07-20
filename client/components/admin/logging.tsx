'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { blockObj, textObj } from '@/styles/admin'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import TitleSection from './titleSection'
import Pagination from '../ui/pagination'
import { hover } from '@/styles/style'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface LoggingProps {
    allLogging: {
        _id:string, 
        createdAt:Date,
        user:{
            avatar:string, 
            name:string, 
            ip:string,
        }, 
        action:string,
        lot: {lotNumber:string}
    }[]
    total: number
    currentPage: number
    currentSort: string
    currentOrder: string
}

export default function Logging({allLogging, total, currentPage, currentSort, currentOrder}:LoggingProps) {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updateUrl = (updates: Record<string, string>) => {
      const p = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) p.set(key, value)
        else p.delete(key)
      })
      router.push(`${pathname}?${p.toString()}`)
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
    <div className='flex flex-col gap-2 w-full'>
      <TitleSection title={t('admin', 'Logging')}/>
      <div className="flex flex-wrap gap-2 px-2 md:px-0">
        <button onClick={() => handleSort('createdAt')} className={sortButtonClass}>
          Дата <SortIcon field="createdAt"/>
        </button>
        <button onClick={() => handleSort('action')} className={sortButtonClass}>
          Действие <SortIcon field="action"/>
        </button>
      </div>
      <div className='flex flex-col w-full'>
        <div></div>
        {allLogging.map((log) => {
             const date = log.createdAt 
            ? new Date(log.createdAt).toLocaleDateString('en-CA') 
            : 'Даты нету';
            return (
                <div key={log._id} className={blockObj}>
                  <div className='flex gap-2 items-center'>
                      <AvatarBlock avatar={log.user.avatar} size='45'/>
                      <span>{log.user.name}</span>
                      <p className='text-orange-600'>{t('admin', log.action)} <Link href={`/${lang}/lot/${log.lot?.lotNumber}`} className='font-bold border-b-2'>{log.lot?.lotNumber}</Link></p>
                  </div>
                  <span className={textObj}>Дата: <br /> <span className='text-black'>{date}</span></span>
                </div>
            )
        })}
      </div>
      <Pagination total={total} maxLot={20}/>
    </div>
  )
}

