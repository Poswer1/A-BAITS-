'use client'

import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass, linkClass, sidebarClass } from '@/styles/profile/sidebar';
import { User, MessageCircle, Settings, Tag, Gavel, Star} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';

export default  function Sidebar() {
  
  const [activeLink, setActiveLink] = useState('profile')
  const params = useParams()
  const lang = params.lang as string

  const {t} = useTranslation()

  const listLinks = [
    {name: t('profile', 'profile'), icon: <User/>, link: 'profile'},
    {name: t('profile', 'myLots'), icon: <Tag/>, link: 'myLots'},
    {name: t('profile', 'historyBids'), icon: <Gavel />, link: 'historyBids'},
    {name: t('profile', 'favorites'), icon: <Star />, link: 'favorites'},
    {name: 'Чат', icon: <MessageCircle/>, link: 'chat'},
    {name: 'Настройки', icon: <Settings/>, link: 'settings'},
  ]

  return (
    <div className={sidebarClass}>
      {listLinks.map(link => (
      <Link href={`/${lang}/profile/${link.link !== 'profile' ? link.link : ''}`} onClick={() => setActiveLink(link.link)} className={`${hoverCat} ${activeLink === link.link && linkActiveClass} ${linkClass} `}>
        {link.icon}
        {link.name}
      </Link>
      ))}
    </div>
  )
}
