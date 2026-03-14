import { arrowActive } from '@/styles/style'
import { ChevronDown, Globe } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function ChangeLanguage() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const listLang = [
    {name: 'Русский'},
    {name: 'Українська'}
  ]

  return (
    <div onClick={() => setOpen(prev => !prev)}className='flex justify-center items-center gap-2 cursor-pointer relative '>
        <Globe />
        {pathname === '/uk' ? 'Українська' : 'Русский'}
        <ChevronDown  className={arrowActive(openLanguage)arrowActive}/>
        {open && (
          <div ref={modalRef} onClick={(e) => e.stopPropagation()} className='w-full p-2 absolute top-[100%] flex flex-col justify-center items-start z-10 bg-white text-black rounded-xl gap-2'>
            {listLang.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </div>
        )}
   </div>
  )
}

