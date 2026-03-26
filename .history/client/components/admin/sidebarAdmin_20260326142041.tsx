'use client'

import { useTranslation } from '@/app/context/TranslationProvider'


function SidebarAdmin() {

  const {t} = useTranslation()

  const listLinks = [
    {name: t('admin', 'User'), icon: }
  ]

  return (
    <div className='bg-white text-black w-screen md:w-auto overflow-x-auto flex justify-start items-start'>
      
    </div>
  )
}


