'use client'

import { hoverCat } from '@/styles/categoryList'
import { arrowActive, hover } from '@/styles/style'
import { useClickOutside } from '@/utils/useClickOutside'
import { ChevronDown } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
    setValue: (v:string) => void
    value:string
    valueLang:st
    list: any[]
    handle?:() => void
}

export default function SelectionField({title, placeholder, list, setValue, value, handle}:SelectionFieldProps) {
  
    const [open, setOpen] = useState(false)
    const params = useParams()
    
    const lang = params.lang as string

    const modalRef = useClickOutside(setOpen)

    
    return (
    <div className='flex flex-col justify-start items-start w-full relative'>
      <span>{title}</span>
        <div onClick={() => setOpen(prev => !prev)} className={` p-2 bg-gray-100 w-full flex justify-between rounded-md cursor-pointer relative`}>
            {value || placeholder}
            <ChevronDown className={arrowActive(open)}/>
        </div>
        {open && (
        <div ref={modalRef} className='fle flex-col justify-start items-start bg-gray-100 w-full rounded-b-md min-h-auto max-h-50 overflow-auto custom-scrollbar absolute top-full left-0 z-30'>
            {list?.map((obg, index) => (
                 <span key={index} onClick={() => {setValue(lang === 'ru' ? obg.ru || obg.name : obg.uk || obg.name), setOpen(false)}} className={`py-1 px-2 ${hoverCat} w-full flex`}>{lang === 'ru' ? obg.ru || obg.name : obg.uk || obg.name}</span>
            ))}
        </div>
        )}
    </div>
  )
}


