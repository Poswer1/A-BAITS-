'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className={}>
        <div className='flex flex-col justify-start items-start  gap-2'>
            <h1 className='font-bold'>{t('lot', 'desc')}</h1>
            <p className='whitespace-pre-line'>{lot.descriptions}</p>
        </div>
    </div>
  )
}


