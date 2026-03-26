'use client'

import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass } from '@/styles/profile/sidebar';
import { User, MessageCircle, Settings, Tag,TrendingUp, Wallet, Loader, Archive, Flag, DollarSign, Star, Package, MessageSquare} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';
import { getUserById } from '@/services/user';

interface SidebarProps {
  mode: string
  active?: string,
  name?:string
  setActive?: (v:string) => void
}

interface SidebarLink {
  name: string
  icon: React.ReactNode
  link: string
}

export default function Sidebar({mode, active, name} : SidebarProps) {

  const params = useParams()
  const path = usePathname()
  const lang = params.lang as string

  const {t} = useTranslation()
  const [username, setUsername] = useState('')

  useEffect(() => {
    getUserById()
    .then(data => {
      setUsername(data.name)
    })
  }, [])


  let listLinks: SidebarLink[] = []

  {mode === 'sidebarMain' ? (
    listLinks = [
      {name: t('profile', 'profile'), icon: <User/>, link:`/${name && name}` },
      {name: t('profile', 'sell'), icon: <Tag/>, link: 'sell/Active'},
      {name: t('profile', 'buy'), icon: <TrendingUp/>, link: 'buy/Active'},
      {name: 'Чат', icon: <MessageCircle/>, link: 'chat'},
    ]
  ): mode === 'buy' || mode === 'sell' ?(
    listLinks = [
      {name: t('profile', 'active'), icon: <Loader/>, link: `${mode}/Active`},
      ...(mode === 'buy'
      ? [{ name: t('profile', 'favorites'), icon: <Star />, link: `${mode}/Favorite` }]
      : []),
      {name: t('profile', 'archived'), icon: <Archive/>, link: `${mode}/Archive` },
      {name: t('profile', 'completed'), icon: <Flag/>, link: `${mode}/Completed`},
      {name: t('profile', 'sold'), icon: <DollarSign/>, link: `${mode}/Sold`},
    ]
  ): mode === 'sidebarProfile' &&(
    listLinks = [
      {name: t('profile', 'Reviews'), icon: <MessageSquare/>, link: `/${name}/reviews`},
      ...(name === username 
        ? [{name: 'Баланс', icon: <Wallet/>, link: `${name}/balance`}, {name: t('profile', 'setting'), icon: <Settings/>, link: `${name}/settings`}] 
        : [{name: t('global', 'lot'), icon: <Package />, link: `${name}/lots`}]),
    ]
  )}

  return {
    if()
    return (
      <div 
        className={`bg-white text-black w-screen md:w-auto overflow-x-auto flex ${mode === 'sidebarMain' && 'md:flex-col md:h-screen'} 
        justify-start items-start 
        ${mode === 'sidebarMain'? (active === 'Чат'? 'md:w-20 2xl:w-25': 'md:w-60 2xl:w-70'): ''} 
        transition-[width] duration-500 ease-in-out overflow-hidden 
        ${mode !== 'sidebarMain' && '!h-auto '}`}
      >
        {listLinks.map(link => (
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
}
