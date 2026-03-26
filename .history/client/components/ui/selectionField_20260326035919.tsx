'use client'

import { hoverCat } from '@/styles/categoryList'
import { arrowActive, hover } from '@/styles/style'
import { getValueByLang } from '@/utils/translateValue'
import { useClickOutside } from '@/utils/useClickOutside'
import { ChevronDown } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface SelectionFieldProps<T extends string | number> {
    title: string
    placeholder: string
    setValue: (v:T) => void
    value: T
    list: any[]
}

export default function SelectionField<T extends string | number>({title, placeholder, list, setValue, value}:SelectionFieldProps<T>) {
  
    const [open, setOpen] = useState(false)
    const params = useParams()
    
    const lang = params.lang as string

    const modalRef = useClickOutside(setOpen)

    const valueName = getValueByLang(list, (value as T), lang)
    
    return (
    <div className='flex flex-col justify-start items-start w-full relative gap-1'>
      <span className='md:text-sm'>{title}</span>
        <div onClick={() => setOpen(prev => !prev)} className={` p-2 bg-gray-100 w-full flex justify-between rounded-lg cursor-pointer relative`}>
            {valueName || value || placeholder}
            <ChevronDown className={arrowActive(open)}/>
        </div>
        
        <div ref={modalRef} className={`${open ? "min-h-auto max-h-50" : "min-h-0 max-h-0 opacity-90"} transition-all duration-300 ease-in-out flex flex-col justify-start items-start bg-gray-100 w-full rounded-b-md overflow-auto custom-scrollbar absolute top-full left-0 z-30`}>
            {list?.map((obg, index) => (
                 <span key={index} onClick={() => {setValue(obg.name), setOpen(false)}} className={`py-1 px-2 ${hoverCat} w-full flex`}>{lang === 'ru' ? obg.ru || obg.name : obg.uk || obg.name}</span>
            ))}
        </div>
       
    </div>
  )
}


