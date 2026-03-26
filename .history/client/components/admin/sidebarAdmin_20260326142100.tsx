'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { User } from 'lucide-react'


function SidebarAdmin() {

  const {t} = useTranslation()

  const listLinks = [
    {name: t('admin', 'User'), icon: <User />, link: `/${}`}
  ]

  return (
    <div className='bg-white text-black w-screen md:w-auto overflow-x-auto flex justify-start items-start'>
      
    </div>
  )
}


