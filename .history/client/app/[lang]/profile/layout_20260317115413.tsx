'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import Sidebar from '@/components/profile/sidebar'
import Loading from '@/components/ui/loadig'
import { getUserById } from '@/services/user'
import { loadingBlock } from '@/styles/global'
import { UserTypes } from '@/types/types'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function layout({children}: {children: React.ReactNode}) {

  const [activeLink, setActiveLink] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const params = useParams()
  const name = params.username ? decodeURIComponent(params.username as string): ''

  const {t} = useTranslation()

  useEffect(() => {
    getUserById()
    .then(data => {
      setUsername(data.name)
      setLoading(false)
    }) 
  }, [])

  useEffect(() => {
    if(!pathname) return
    if(pathname.includes('buy')) {
      setActiveLink(t('profile', 'buy'))
    } else if(pathname.includes('sell')) {
      setActiveLink(t('profile', 'sell'))
    } else if(pathname.includes('chat')) {
      setActiveLink('Чат')
    } else {
      setActiveLink(t('profile', 'profile'))
    }
  }, [pathname, t])

  return (
    <div className='flex flex-col md:flex-row justify-center items-start h-250 w-full bg-gray-100 overflow-x-hidden'>
      {loading ? (
        <div className={loadingBlock}>
          <Loading />
        </div>
      ): (
        <>
          <div className={`${(!name || name === username) ? '' : 'invisible'} h-full`}>
            <Sidebar mode='sidebarMain' active={activeLink} name={username}/>
          </div>
          {children}
        </>
      )}
    </div>
  )
}

export default layout
