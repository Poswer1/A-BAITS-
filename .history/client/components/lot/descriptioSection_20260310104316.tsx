'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { LotTypes } from '@/types/types'    

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()

  return (
    <div className="flex flex-col w-[80%] justify-start items-start gap-2">
        <div className='flex jus'>

        </div>
        <h1 className='text-xl'>{t('lot', 'desc')}</h1>
        <p>{lot.descriptions}</p>
    </div>
  )
}


