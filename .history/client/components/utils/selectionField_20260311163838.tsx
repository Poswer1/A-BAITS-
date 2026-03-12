import { hoverCat } from '@/styles/categoryList'
import { arrowActive, hover } from '@/styles/style'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SelectionFieldProps {
    title: string
    placeholder: string
    list: any[]
}

export default function SelectionField({title, placeholder, list}:SelectionFieldProps) {
  
    const [open, setOpen] = useState(false)
    
    return (
    <div className='flex flex-col justify-start items-start w-full'>
      <span>{title}</span>
        <div onClick={() => setOpen(prev => !prev)} className={`${hover} p-2 bg-gray-100 w-full flex justify-between rounded-md cursor-pointer relative`}>
            {placeholder}
            <ChevronDown className={arrowActive(open)}/>
        </div>
        {open && (
            <div className='fle flex-col justify-start items-start bg-gray-100 w-full rounded-b-md'>
                {list.map((obg, index) => (
                    <span key={in} className={`py-1 px-2 ${hoverCat} w-full flex`}>tet</span>
                ))}
            </div>
        )}
    </div>
  )
}


