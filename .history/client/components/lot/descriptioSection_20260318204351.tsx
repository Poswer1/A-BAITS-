'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { columnBlock } from '@/styles/lot'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className={`${columnBlock}`}>
        <div className='flex flex-col justify-start items-start gap-2 max-h-[230px]'>
            <h1 className='font-bold'><Cher {t('lot', 'desc')}</h1>
            <div className='overflow-auto custom-scrollbar'>
             <p className='whitespace-pre-line'>{lot.descriptions}</p>
            </div>
        </div>
    </div>
  )
}


