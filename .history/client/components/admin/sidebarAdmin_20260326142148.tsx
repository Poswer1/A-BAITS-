'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { Link, User } from 'lucide-react'


function SidebarAdmin() {

  const {t} = useTranslation()

  const listLinks = [
    {name: t('admin', 'User'), icon: <User />, link: `/users`}
  ]

  return (
    <div className='bg-white text-black w-screen md:w-auto overflow-x-auto flex justify-start items-start'>
      {listLinks.map((link, index) => (
        <Link />
      ))}
    </div>
  )
}


