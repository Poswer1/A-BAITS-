import { arrowActive } from '@/styles/style'
import { useClickOutside } from '@/utils/useClickOutside'
import { ChevronDown, Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ChangeLanguage() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const listLang = [
    {name: 'Русский', value:'ru'},
    {name: 'Українська', value: 'uk'}
  ]
  const modalRef = useClickOutside(setOpen)

  const handleChangeLang = (lang:string) => {
    const parts = pathname.split('/').filter(Boolean)

    if(parts.length > 0) {
      parts[0] = lang
    }

    const newPath = `/${parts.spl}`

  }

  return (
    <div onClick={() => setOpen(prev => !prev)}className='flex justify-center items-center gap-2 cursor-pointer relative '>
        <Globe />
        {pathname === '/uk' ? 'Українська' : 'Русский'}
        <ChevronDown  className={arrowActive(open)}/>
        {open && (
          <div ref={modalRef} onClick={(e) => e.stopPropagation()} className='w-full p-2 absolute top-[100%] flex flex-col justify-center items-start z-10 bg-white text-black rounded-xl gap-2'>
            {listLang.map((item, index) => (
              <span key={index} onClick={() => handleChangeLang(item.value)}>{item.name}</span>
            ))}
          </div>
        )}
   </div>
  )
}

