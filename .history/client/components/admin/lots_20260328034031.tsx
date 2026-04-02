import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'
import React from 'react'

interface LotsProps {
    lots: LotTypes[]
}

export default function Lots({lots}:LotsProps) {

    const {t} = useTranslation()
    

  return (
    <div>
      
    </div>
  )
}

