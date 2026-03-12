import { ChevronDown } from 'lucide-react'
import React from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
}

export default function SelectionField({title, placeholder}:SelectionFieldProps) {
  return (
    <div className='flex flex-col justify-start items-start  w-full'>
      <span>{title}</span>
      <div className='p-2 bg-gray-100 w-full flex rounded-md cursor-pointer'>
        {placeholder}
        <ChevronDown />
        </div>
    </div>
  )
}


