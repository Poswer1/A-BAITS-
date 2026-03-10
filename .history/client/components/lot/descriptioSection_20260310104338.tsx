'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className="flex w-[80%] justify-start items-start gap-2">
        <div className='flex flex-col justify-center items-center w-1/2'>
            <h1 className='text-xl'>{t('lot', 'desc')}</h1>
            <p>{lot.descriptions}</p>
        </div>
    </div>
  )
}


