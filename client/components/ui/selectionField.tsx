'use client'

import { hoverCat } from '@/styles/categoryList'
import { arrowActive, hover } from '@/styles/style'
import { getValueByLang } from '@/utils/translateValue'
import { useClickOutside } from '@/utils/useClickOutside'
import { ChevronDown } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from '@/app/context/TranslationProvider'

interface SelectionFieldProps<T extends string | number> {
    title: string
    placeholder: string
    bgColor?: string
    setValue: (v:T) => void
    value: T
    list: any[]
    error?: string | boolean
}

export default function SelectionField<T extends string | number>({title, placeholder, list, setValue, value, bgColor, error}:SelectionFieldProps<T>) {
  
    const [open, setOpen] = useState(false)
    const params = useParams()
    
    const lang = params.lang as string
    const {t} = useTranslation()

    const modalRef = useClickOutside(setOpen)

    const valueName = getValueByLang(list, value, lang)
    
    return (
    <div className='flex flex-col justify-start items-start w-full relative gap-1'>
      <span className={`md:text-sm ${error ? 'text-red-600 font-semibold' : ''}`}>{title}</span>
        <div onClick={() => setOpen(prev => !prev)} className={` p-2 ${bgColor || 'bg-gray-100'} w-full flex justify-between rounded-lg cursor-pointer relative border-2 ${error ? 'border-red-600 bg-red-600/10' : 'border-transparent'}`}>
            {valueName || value || placeholder}
            <ChevronDown className={arrowActive(open)}/>
        </div>
        {error && (
            <span className="text-red-500 text-xs">{t('createLot', 'createLot-required-field')}</span>
        )}
        
        <div ref={modalRef} className={`${open ? "min-h-auto max-h-50 pb-2" : "min-h-0 max-h-0 opacity-90"} transition-all ${bgColor || 'bg-gray-100'}  duration-300 ease-in-out flex flex-col justify-start items-start w-full rounded-b-md overflow-auto custom-scrollbar absolute top-full left-0 z-30 `}>
            {list?.map((obg, index) => (
                 <span key={index} onClick={() => {setValue(obg.name), setOpen(false)}} className={`py-1 px-2 ${hoverCat} w-full flex`}>{lang === 'ru' ? obg.ru || obg.name : obg.uk || obg.name}</span>
            ))}
        </div>
        {error && typeof error === 'string' && (
          <span className='text-red-600 text-sm'>{error}</span>
        )}
    </div>
  )
}


