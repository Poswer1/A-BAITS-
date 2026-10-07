'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import Sidebar from '@/components/profile/sidebar'
import Loading from '@/components/ui/loadig'
import { getUserById } from '@/services/user'
import { loadingBlock } from '@/styles/global'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ProfileLayoutClient({children}: {children: React.ReactNode}) {

  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const params = useParams()
  const name = params.username ? decodeURIComponent(params.username as string): ''
  const {t} = useTranslation()
  const activeLink = pathname?.includes('buy')
    ? t('profile', 'buy')
    : pathname?.includes('sell')
      ? t('profile', 'sell')
      : pathname?.includes('chat')
        ? 'Чат'
        : t('profile', 'profile')

  useEffect(() => {
    getUserById()
    .then(data => {
      setUsername(data.name)
      setLoading(false)
    }) 
  }, [])

  return (
    <div className='flex flex-col md:flex-row justify-start min-h-[92vh] items-start overflow-hidden text-black w-full bg-gray-100 overflow-x-hidden'>
      {loading ? (
        <div className={loadingBlock}>
          <Loading />
        </div>
      ): (
        <>
          {(!name || name === username) && (
            <Sidebar mode='sidebarMain' active={activeLink} name={username}/>
          )}
          <main className={`relative w-full min-w-0 ${pathname?.includes('/chat') ? 'z-10' : 'z-0'}`}>
            {children}
          </main>
        </>
      )}
    </div>
  )
}

export default ProfileLayoutClient
