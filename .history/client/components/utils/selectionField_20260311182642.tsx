'use client'

import { hoverCat } from '@/styles/categoryList'
import { arrowActive, hover } from '@/styles/style'
import { useClickOutside } from '@/utils/useClickOutside'
import { ChevronDown } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
    setValue: (v:string) => void
    value:string
    list: any[]
}

export default function SelectionField({title, placeholder, list, setValue, value}:SelectionFieldProps) {
  
    const [open, setOpen] = useState(false)
    const params = useParams()
    
    const lang = params.lang as string

    const modalRef = useClickOutside(setOpen)

    return (
    <div className='flex flex-col justify-start items-start w-full'>
      <span>{title}</span>
        <div onClick={() => setOpen(prev => !prev)} className={` p-2 bg-gray-100 w-full flex justify-between rounded-md cursor-pointer relative`}>
            {value || placeholder}
            <ChevronDown className={arrowActive(open)}/>
            
        </div>
    </div>
  )
}


