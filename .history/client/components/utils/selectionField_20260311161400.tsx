import { hover } from '@/styles/style'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
    open: boolean
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function SelectionField({title, placeholder, open, setOpen}:SelectionFieldProps) {
  return (
    <div className='flex flex-col justify-start items-start  w-full'>
      <span>{title}</span>
      <div onClick={() => setOpen(prev => !prev)} className={`${hover} p-2 bg-gray-100 w-full flex justify-between rounded-md cursor-pointer`}>
        {placeholder}
        {open ? (
            <ChevronUp />
        ): (
            <ChevronDown />
        )}
        </div>
    </div>
  )
}


