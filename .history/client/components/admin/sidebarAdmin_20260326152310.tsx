'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { hoverCat } from '@/styles/categoryList'
import { linkActiveClass } from '@/styles/profile/sidebar'
import { User, Box, DollarSign, Bell, FileText, Settings, Gift } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'


export default function SidebarAdmin() {

  const {t} = useTranslation()
  const params = useParams()
  const lang = params.lang as string
  const path = usePathname()

  const listLinks = [
    { name: t('admin', 'Users'), icon: <User />, link: '/users' },
    { name: t('admin', 'Lots'), icon: <Box />, link: '/lots' },
    { name: t('admin', 'Auctions'), icon: <Gift />, link: '/auctions' },
    { name: t('admin', 'Finance'), icon: <DollarSign />, link: '/finance' },
    { name: t('admin', 'Notifications'), icon: <Bell />, link: '/notifications' },
    { name: t('admin', 'Reports'), icon: <FileText />, link: '/reports' },
    { name: t('admin', 'Settings'), icon: <Settings />, link: '/settings' }
  ]


  return (
    <div className='flex flex-col bg-white text-black w-screen h-screen md:w-60 overflow-x-auto flex justify-start items-start'>
      {listLinks.map(link => (
         <Link
            key={link.link}
            href={`/${lang}/admin/${link.link}`}
            className={`${hoverCat} px-5 lg:px-7 2xl:px-10 py-4 border-r-2 border-transparent flex justify-start items-center w-full gap-2 ${path.includes(link.link) && linkActiveClass}`}
          >
            <div className="transition-all duration-300">{link.icon}</div>
            <span>{link.name}</span>
        </Link>
      ))}
    </div>
  )
}


