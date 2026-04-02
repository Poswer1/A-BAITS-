'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import {useState } from 'react'
import { changeStatus, deleteUser } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import Setting from '../profile/setting'
import { ChevronLeft } from 'lucide-react'

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
    const [edit, setEdit] = useState(false)
    const [searchValue, setSearchValue] = useState('')


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

  const handleDeleteUser = async (id:string) => {
    const confirmDelete = window.confirm(t('admin', 'confirmDeleteUser'));
    if (!confirmDelete) return;
    try {
      await deleteUser(id)
      setListUsers(prev => prev.filter(user => user._id !== id))
      setMessage(t('admin', 'successDeleteUser'))
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error:any) {
      setMessage(t('admin', error.message))
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }
  

  return (
    <div className="flex flex-col w-full gap-2">
        <div className='flex justify-start items-center gap-5'>
            {(id && edit) && (
             <span className={`${hover} flex justify-start items-center`} onClick={() => {setId(''), setEdit(false)}}><ChevronLeft /> Назад</span>
            )}
            <h1 className='text-xl'>{edit ? t('admin', 'editUser') : t('admin', 'Users')}</h1>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            {(message || error) && (
              <span className={`${animationScale} ${message ? 'text-green-500' : 'text-red-500'}`}>{message || error}</span>
            )}
        </div>
        {edit ? (
          <Setting id={id}/>
        ): (
          <div className="flex flex-col justify-start items-start">
            {listUsers.map((user) => (
              <div className="flex justify-between items-center gap-4 bg-white w-full p-2 border-t border-b border-gray-200">
                <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
                  <AvatarBlock avatar={user.avatar} size="45"/>
                  <span key={user._id}>{user.name}</span>
                </Link>
                <div className='flex justify-start items-center gap-4'>
                  <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
                  <button className={`${hover}`} onClick={() => {setId(user._id), setEdit(true)}}>{t('admin', 'edit')}</button>
                  <span className={`${hover} text-red-500`} onClick={() => handleDeleteUser(user._id)}>{t('admin', 'delete')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

