'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import { useState } from 'react'
import { changeStatus } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'

interface listUserProps {
    listUser: UserTypes[]
}

export default  function User({listUser}: listUserProps) {

    const {t} = useTranslation()

    const params = useParams()
    const lang = params.lang as string 
    
    const [statusUser, setStatusUser] = useState('No restrictions')
    const [message, setMessage] = useState('')

     const handleChangeStatus = async (id:string) => {
        try {
            const data = await changeStatus(id) 
            setStatusUser(data.status)
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
            <Link href={`/${lang}/profile/${user.name}`} className="flex justify-center items-center gap-2">
              <AvatarBlock avatar={user.avatar} size="45"/>
              <span key={user._id}>{user.name}</span>
            </Link>
            <button className={``} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

