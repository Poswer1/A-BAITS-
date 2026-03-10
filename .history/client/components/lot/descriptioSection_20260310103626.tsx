import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'
import React from 'react'

export default function DescriptioSection({lot}: {lot:LotTypes}) {

const {t} = useTranslation()

  return (
    <div className="flex flex-col w-1/2 justify-start items-start">
    <h1>{t('lot', 'desc')}</h1>
    </div>
  )
}


