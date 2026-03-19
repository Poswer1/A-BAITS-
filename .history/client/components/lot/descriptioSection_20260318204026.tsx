'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { columnBlock } from '@/styles/lot'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className={`${columnBlock} h-full`}>
        <div className='flex flex-col justify-start items-start gap-2 max-h-57'>
            <h1 className='font-bold'>{t('lot', 'desc')}</h1>
            <div className='flex flex-col justify-start items-start'>

            </div>
            <p className='whitespace-pre-line'>{lot.descriptions}</p>
        </div>
    </div>
  )
}


