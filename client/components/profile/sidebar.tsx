'use client'

import { hoverCat } from '@/styles/categoryList';
import { linkActiveClass, linkClass, sidebarClass } from '@/styles/profile/sidebar';
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
    const token = localStorage.getItem('token')
    if(!token) return
    getUserById(token)
    .then(data => {
      setUsername(data.name)
    })
  }, [])

  let listLinks: SidebarLink[] = []

  {mode === 'sidebarMain' ? (
    listLinks = [
      {name: t('profile', 'profile'), icon: <User/>, link:`/${name && name}` },
      {name: t('profile', 'sell'), icon: <Tag/>, link: 'sell'},
      {name: t('profile', 'buy'), icon: <TrendingUp/>, link: 'buy'},
      {name: 'Чат', icon: <MessageCircle/>, link: 'chat'},
    ]
  ): mode === 'buy' || mode === 'sell' ?(
    listLinks = [
      {name: t('profile', 'active'), icon: <Loader/>, link: 'active'},
      ...(mode === 'buy'
      ? [{ name: t('profile', 'favorites'), icon: <Star />, link: 'favorite' }]
      : []),
      {name: t('profile', 'archived'), icon: <Archive/>, link: 'archive'},
      {name: t('profile', 'completed'), icon: <Flag/>, link: 'completed'},
      {name: t('profile', 'sold'), icon: <DollarSign/>, link: 'sold'},
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
    <div className={`${sidebarClass} ${mode !== 'sidebarMain' && '!h-auto'}`}>
      {listLinks.map(link => (
          mode === 'sell' || mode === 'buy' ? (
            active && setActive && (
              <span key={link.link} className={`${linkClass} ${hoverCat} ${active === link.link && linkActiveClass}`} onClick={() => setActive(link.link)}>
                {link.icon}
                {link.name}
              </span>
            )
          ) : (
            <Link
              key={link.link}
              href={`/${lang}/profile/${link.link}`}
              className={`${hoverCat} ${linkClass} ${active === link.name && linkActiveClass}`}
            >
              {link.icon}
              {link.name}
            </Link>
          )
        ))}
    </div>
  )
}
