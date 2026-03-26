'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { User } from 'lucide-react'
import Link from 'next/link'


function SidebarAdmin() {

  const {t} = useTranslation()

  const listLinks = [
    {name: t('admin', 'User'), icon: <User />, link: `/users`}
  ]

  return (
    <div className='bg-white text-black w-screen md:w-auto overflow-x-auto flex justify-start items-start'>
      {listLinks.map((link, index) => (
         <Link
              key={link.link}
              href={`/${lang}/profile/${link.link}`}
              className={`${hoverCat} px-5 lg:px-7 2xl:px-10 py-4 border-r-2 border-transparent flex justify-start items-center w-full gap-2 ${active === link.name && linkActiveClass}`}
            >
              <div className="transition-all duration-300">{link.icon}</div>
              <span className={`${(active === 'Чат' && mode === 'sidebarMain') ? 'md:opacity-0 md:absolute' : 'opacity-100 transition-all duration-300 ease-in-out'}`}>{link.name}</span>
            </Link>
      ))}
    </div>
  )
}


