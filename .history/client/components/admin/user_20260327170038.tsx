'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import { useState } from 'react'
import { changeStatus } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { hover } from '@/styles/style'

interface listUserProps {
    listUser: UserTypes[]
}

export default  function User({listUser}: listUserProps) {

    const {t} = useTranslation()

    const params = useParams()
    const lang = params.lang as string 
    
    const [listUsers, setListUsers] = useState(listUser)
    const [message, setMessage] = useState('')

     const handleChangeStatus = async (id:string) => {
        try {
            const data = await changeStatus(id) 
            setListUsers(prev => prev.map(user =>
                user._id 
            ))
        } catch (error:any) {
            setMessage(error.message)
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
  }

  return (
    <div className="flex flex-col w-full">
      <h1>Пользователи</h1>
      <div className="flex flex-col justify-start items-start gap-4">
        {listUser.map((user) => (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
              <AvatarBlock avatar={user.avatar} size="45"/>
              <span key={user._id}>{user.name}</span>
            </Link>
            <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

