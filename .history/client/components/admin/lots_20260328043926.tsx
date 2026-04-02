'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import { LotTypes } from '@/types/types'
import { ChevronLeft, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import LotCardV2 from '../lotCardV2'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface LotsProps {
    lots: LotTypes[]
}

export default function Lots({lots}:LotsProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [allLots, setAllLots] = useState(lots)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        
        router.push(`?search=${encodeURIComponent(searchValue.toString())}`)
    }, [searchValue])

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='flex justify-start items-center gap-5 w-full'>
        {(id && edit) && (
             <span className={`${hover} flex justify-start items-center`} onClick={() => {setId(''), setEdit(false)}}><ChevronLeft /> Назад</span>
        )}
        <h1 className='text-xl'>{edit ? t('admin', 'editLots') : t('admin', 'lots')}</h1>
        <div className='flex items-center p-2 border border-gray-300 gap-2 rounded-xl w-1/4'>
            <Search className='text-gray-500' size={20}/>
            <input className='outline-none w-full' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={t('admin', 'searchUser')}/>
        </div>
        {(message || error) && (
            <span className={`${animationScale} ${message ? 'text-green-500' : 'text-red-500'}`}>{message || error}</span>
        )}
    </div>
    <div className="flex flex-col justify-start items-start">
        {allLots.map((lot) => (
            <LotCardV2 key={lot._id} lot={lot}/>
        ))}
    </div>
    </div>
  )
}

