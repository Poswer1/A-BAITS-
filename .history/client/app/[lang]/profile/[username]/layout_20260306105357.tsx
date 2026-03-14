'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import ProfiteHeader from '@/components/profile/profiteHeader'
import Sidebar from '@/components/profile/sidebar'
import Loading from '@/components/utils/loadig'
import { getUserById, getUserByName, } from '@/services/user'
import { loadingBlock } from '@/styles/global'
import { pageContainerClass } from '@/styles/profile/profile'
import { UserTypes } from '@/types/types'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Layout({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<UserTypes>()
    const [acitveLink, setActiveLink] = useState('')
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation()

    const params = useParams()
    const username = params.username ? decodeURIComponent(params.username as string): ''

    const pathname = usePathname()
    
    useEffect(() => {
    if (!pathname) return

    if (pathname.includes('balance')) setActiveLink('Баланс')
    else if (pathname.includes('settings')) setActiveLink(t('profile', 'setting'))
    else if (pathname.includes('reviews')) setActiveLink(t('profile', 'Reviews'))
    else if (pathname.includes('lots')) setActiveLink(t('global', 'lot'))
    else setActiveLink(t('profile', 'profile'))
  }, [pathname, t])

    useEffect(() => {
      if(!username) return
      getUserByName(username)
      .then(data => {
        setUser(data)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
      })
    }, [username])


  return (
    <div className={pageContainerClass}>
      {loading ? (
        <div className={loadingBlock}>
          <Loading />
        </div>
      ): (
        <>
          <h1 className='text-2xl mb-2'>{user?.name} | {acitveLink} </h1>
          <div className='flex justify-start items-start w-full gap-2'>
          <Sidebar mode='sidebarProfile' active={acitveLink} name={username}/>
            <div className='flex flex-col justify-start items-start gap-2 w-1/2'>
              <ProfiteHeader user={user}/>
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
