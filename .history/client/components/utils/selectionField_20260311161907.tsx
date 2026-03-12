import { arrowActive, hover } from '@/styles/style'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
}

export default function SelectionField({title, placeholder}:SelectionFieldProps) {
  
    const [open, setOpen] = useState(false)
    
    return (
    <div className='flex flex-col justify-start items-start  w-full'>
      <span>{title}</span>
      <div onClick={() => setOpen(prev => !prev)} className={`${hover} p-2 bg-gray-100 w-full flex justify-between rounded-md cursor-pointer`}>
        {placeholder}
        
            <ChevronUp className={arrowActive(open)}/>
        ): (
            <ChevronDown className={arrowActive(open)}/>
        
        </div>
    </div>
  )
}


