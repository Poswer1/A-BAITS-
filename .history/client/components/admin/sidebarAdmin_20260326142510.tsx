'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { hoverCat } from '@/styles/categoryList'
import { linkActiveClass } from '@/styles/profile/sidebar'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'


function SidebarAdmin() {

  const {t} = useTranslation()
  const params = useParams()
  const lang = params.lang as string
  const path = usePathname()

  const listLinks = [
    {name: t('admin', 'User'), icon: <User />, link: `/users`}
  ]

  let active

  return (
    <div className='bg-white text-black w-screen md:w-auto overflow-x-auto flex justify-start items-start'>
      {listLinks.map((link, index) => (
         <Link
            key={link.link}
            href={`/${lang}/admin/${link.link}`}
            className={`${hoverCat} px-5 lg:px-7 2xl:px-10 py-4 border-r-2 border-transparent flex justify-start items-center w-full gap-2 ${active === link.name && linkActiveClass}`}
          >
            <div className="transition-all duration-300">{link.icon}</div>
            <span>{link.name}</span>
        </Link>
      ))}
    </div>
  )
}


