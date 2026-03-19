'use client'

import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass } from '@/styles/profile/sidebar';
import { User, MessageCircle, Settings, Tag,TrendingUp, Wallet, Loader, Archive, Flag, DollarSign, Star, Package, MessageSquare} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

export default function Sidebar({mode, active, setActive, name} : SidebarProps) {

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

  return (
    <div className={`bg-white h-full flex ${mode === 'sidebarMain' && 'flex-col'} justify-start items-start 2xl:min-w-70 ${active === 'Чат' ? 'lg:min-w-10' : 'lg:min-w-60'} transition-all duration-500 ${mode !== 'sidebarMain' && '!h-auto'}`}>
      {listLinks.map(link => (
            <Link
              key={link.link}
              href={`/${lang}/profile/${link.link}`}
              className={`${hoverCat} lg:px-7 2xl:px-10 py-4 border-r-2 border-transparent flex justify-start items-center w-full gap-2 ${active === link.name && linkActiveClass}`}
            >
              {link.icon}
              <span className={`${active === 'Чат' ? 'lg:hidden' : 'lg:block'} 2xl:block`}>{link.name}</span>
            </Link>
        ))}
    </div>
  )
}
