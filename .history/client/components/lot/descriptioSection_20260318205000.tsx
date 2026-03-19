'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { columnBlock } from '@/styles/lot'
import { arrowActive } from '@/styles/style'
import { LotTypes } from '@/types/types'    
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function DescriptioSection({lot}: {lot:LotTypes}) {

    const {t} = useTranslation()
    const [open, setOpen] = useState(false)

  return (
    <div className={`${columnBlock}`}>
        <div className='flex flex-col justify-start items-start gap-2 max-h-[200px] md:max-h-[230px]'>
            <h1 onClick={() => setOpen(prev => !prev)} className='font-bold cursor-pointer flex gap-1'>{t('lot', 'desc')}<ChevronDown className={arrowActive(open)}/></h1>
            <div className={`overflow-auto custom-scrollbar ${open ? 'h-[200px] opacity-100' : 'h-0 opacity-0'} transition-all duration-500`}>
             <p className='whitespace-pre-line'>{lot.descriptions}</p>
            </div>
        </div>
    </div>
  )
}


