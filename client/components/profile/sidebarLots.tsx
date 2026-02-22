'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass, linkClass, sidebarClass } from '@/styles/profile/sidebar'
import { Loader, Archive, Flag, DollarSign} from 'lucide-react';

export default function SidebarLots({active, setActive}: {active: string, setActive: (value: string) => void}) {

  const {t} = useTranslation()

  const listLinks = [
    {name: t('profile', 'active'), icon: <Loader/>, link: 'active'},
    {name: t('profile', 'archived'), icon: <Archive/>, link: 'archive'},
    {name: t('profile', 'completed'), icon: <Flag/>, link: 'completed'},
    {name: t('profile', 'sold'), icon: <DollarSign/>, link: 'sold'},
  ]

  return (
    <div className={`${sidebarClass} !h-auto`}>
      {listLinks.map((item, index) => (
        <span key={index} className={`${linkClass} ${hoverCat} ${active === item.link && linkActiveClass}`} onClick={() => setActive(item.link)}>
          {item.icon}
          {item.name}
        </span>
      ))}
    </div>
  )
}
