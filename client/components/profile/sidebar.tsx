'use client'

import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass } from '@/styles/profile/sidebar';
import { User, MessageCircle, Settings, Tag,TrendingUp, Wallet, Loader, Archive, Flag, DollarSign, Star, Package, MessageSquare} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/app/context/TranslationProvider';
import { getUserById } from '@/services/user';
import { button } from '@/styles/global';

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
      {name: t('header', 'createLot'), icon:'', link: `/${lang}/createLot`}
    ]
  ): mode === 'buy' || mode === 'sell' ?(
    listLinks = [
    {name: t('profile', 'active'), icon: <Loader/>, link: `${mode}/Active`},
    ...(mode === 'buy'
      ? [{name: t('profile', 'favorites'), icon: <Star/>, link: `${mode}/Favorite`}]
      : []),
    {name: t('profile', 'completed'), icon: <Flag/>, link: `${mode}/Completed`},
    mode === 'sell'
      ? {name: t('profile', 'sold'), icon: <DollarSign/>, link: `${mode}/Sold`}
      : {name: t('profile', 'buying'), icon: <DollarSign/>, link: `${mode}/Buying`},
    {name: t('profile', 'archived'), icon: <Archive/>, link: `${mode}/Archive`}
  ]
  ): mode === 'sidebarProfile' &&(
    listLinks = [
      {name: t('profile', 'Reviews'), icon: <MessageSquare/>, link: `/${name}/reviews`},
      ...(name === username 
        ? [{name: 'Баланс', icon: <Wallet/>, link: `${name}/balance`}, {name: t('profile', 'setting'), icon: <Settings/>, link: `${name}/settings`}] 
        : [{name: t('global', 'lot'), icon: <Package />, link: `${name}/lots`}]),
    ]
  )}

  return (
    <div 
      className={`bg-white text-black w-screen md:w-auto overflow-x-auto flex ${mode === 'sidebarMain' && 'md:flex-col md:h-[92vh]'} 
      justify-between items-center 
      ${mode === 'sidebarMain'? (active === 'Чат'? 'md:w-20 2xl:w-25': 'md:w-60 2xl:w-70'): ''} 
      transition-[width] duration-500 ease-in-out overflow-hidden 
      ${mode !== 'sidebarMain' && '!h-auto '}`}
    >
      <div className={`${mode === 'sidebarMain' ? 'flex md:flex-col' : 'flex'} w-full`}>
        {listLinks.map(link => {
        return (
          <Link
              key={link.link}
              href={`/${lang}/profile/${link.link}`}
              className={`${hoverCat} ${link.name === t('header', 'createLot') && 'bg-orange-600 text-white flex md:hidden'} px-5 lg:px-7 2xl:px-10 py-4 border-r-2 border-transparent flex whitespace-nowrap justify-start items-center w-full gap-2 ${active === link.name && linkActiveClass}`}
            >
              <div className="transition-all duration-300">{link.icon}</div>
              <span className={`${(active === 'Чат' && mode === 'sidebarMain') ? 'md:opacity-0 md:absolute' : 'opacity-100 transition-all duration-300 ease-in-out'}`}>{link.name}</span>
            </Link>
        )
        })}
      </div>
      {(mode === 'sidebarMain' && active !== 'Чат') && (
         <Link href={`/${lang}/createLot`} className={`${button} hidden md:flex md:w-[90%] md:mb-[10%]`}>{t('header', 'createLot')}</Link>
      )}
      
    </div>
  )
}
