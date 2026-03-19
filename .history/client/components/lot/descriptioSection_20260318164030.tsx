'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className="flex  2xl:w-[80%] md:w-[90%] justify-start items-start min-h-80 text-black">
        <div className='flex flex-col justify-start items-start w-full md:w-1/2 gap-2'>
            <h1 className='text-xl'>{t('lot', 'desc')}</h1>
            <p className='whitespace-pre-line'>{lot.descriptions}</p>
        </div>
    </div>
  )
}


