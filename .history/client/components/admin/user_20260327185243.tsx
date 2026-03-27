'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import { useEffect, useState } from 'react'
import { changeStatus, deleteUser } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import Setting from '../profile/setting'
import { ChevronLeft } from 'lucide-react'
import { getUserById } from '@/services/user'

interface listUserProps {
    listUser: UserTypes[]
}

export default  function User({listUser}: listUserProps) {

    const {t} = useTranslation()

    const params = useParams()
    const lang = params.lang as string 
    
    const [listUsers, setListUsers] = useState(listUser)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [id, setId] = useState('')


     const handleChangeStatus = async (id:string) => {
        try {
            const data = await changeStatus(id) 
            setListUsers(prev => prev.map(user =>
                user._id === id ? {...user, status: data.status} : user
            ))
            const successMessage = data.status === 'Blocked' ? t('admin', 'UserSuccessBlocked') : t('admin', 'UserSuccessUnBlocked')
            setMessage(successMessage)
            setTimeout(() => {
              setMessage('')
            }, 3000)
        } catch (error:any) {
            setError(t('admin', error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
  }

  const handleDeleteUser = async () => {
    try {
      const data = await deleteUser()
    } catch (error) {
      
    }
  }
  

  return (
    <div className="flex flex-col w-full gap-2">
        <div className='flex justify-start items-center gap-5'>
            {edit && (
             <span className={`${hover} flex justify-start items-center`} onClick={() => setEdit('')}><ChevronLeft /> Назад</span>
            )}
            <h1 className='text-xl'>{edit ? t('admin', 'editUser') : t('admin', 'Users')}</h1>
            {(message || error) && (
              <span className={`${animationScale} ${message ? 'text-green-500' : 'text-red-500'}`}>{message || error}</span>
            )}
        </div>
        {edit ? (
          <Setting id={edit}/>
        ): (
          <div className="flex flex-col justify-start items-start gap-4">
            {listUsers.map((user) => (
              <div className="flex justify-start items-center gap-4">
                <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
                  <AvatarBlock avatar={user.avatar} size="45"/>
                  <span key={user._id}>{user.name}</span>
                </Link>
                <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
                <button className={`${hover}`} onClick={() => setEdit(user._id)}>{t('admin', 'edit')}</button>
                <span className={`${hover} text-red-500`}>{t('admin', 'delete')}</span>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

