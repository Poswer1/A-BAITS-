import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'
import React, { useState } from 'react'

interface LotsProps {
    lots: LotTypes[]
}

export default function Lots({lots}:LotsProps) {

    const {t} = useTranslation()
    const [allLots, setAllLots] = useState(lots)
    const [edit, setEdit] = useState('')
    const [id, setId] = useState('')
    const [searchValue, setSearchValue] = useState('')

  return (
    <div className='flex flex-col w-full gap-2'>
      
    </div>
  )
}

