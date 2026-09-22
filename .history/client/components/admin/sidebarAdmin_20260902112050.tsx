'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { hoverCat } from '@/styles/categoryList'
import { linkActiveClass } from '@/styles/profile/sidebar'
import { User, Box, DollarSign, Bell, Settings,BarChart, ShieldCheck,Terminal} from 'lucide-react'
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
    { name: t('admin', 'Finance'), icon: <DollarSign />, link: '/finance/transactions' },
    { name: t('admin', 'Notifications'), icon: <Bell />, link: '/notifications' },
    { name: t('admin', 'Statistics'), icon: <BarChart />, link: '/statistics' },
    { name: t('admin', 'ControlOfViolations'), icon: <ShieldCheck/>, link: '/controlOfViolations' },
    { name: t('admin', 'Logging'), icon: <Terminal/>, link: '/logging' },
    { name: t('admin', 'Settings'), icon: <Settings />, link: '/settings' }
  ]


  return (
    <div className={`flex md:flex-col justify-start items-start bg-white text-black w-screen md:h-[92vh] ${path.includes('/lots') ? 'md:w-auto' : 'md:w-80'} overflow-y-hidden overflow-x-auto`}>
      {listLinks.map(link => (
         <Link
            key={link.link}
            href={`/${lang}/admin/${link.link}`}
            className={`${hoverCat} px-5 lg:px-7 2xl:px-10 py-4 border-r-2 whitespace-nowrap border-transparent flex justify-start items-center w-full gap-2 ${path.includes(link.link) && linkActiveClass}`}
          >
            <div className="transition-all duration-300">{link.icon}</div>
            {path.includes('/lots') ? '' : <span>{link.name}</span>}
        </Link>
      ))}
    </div>
  )
}


