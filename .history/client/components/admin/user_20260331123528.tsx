'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import {useState } from 'react'
import { changeStatus, deleteUser, updateBalance } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import Setting from '../profile/setting'
import { ChevronLeft, Search, X } from 'lucide-react'
import ConfirmWindow from './confirmWindow'

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
    const [newBalance, setNewBalance] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [balanceEdit, setBalanceEdit] = useState('')
    const [openConfirm, setOpenConfirm] = useState(false)

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

  const handleUpdateBalance = async (id:string) => {
    try {
      const data = await updateBalance(id, newBalance)
      setListUsers(prev => prev.map(user => user._id === id ? {...user, balance: data.balance} : user))
      setMessage(t('admin', 'successUpdateBalance'))
       setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error updating balance:', error)
      setError(t('admin', 'errorUpdateBalance'))
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  const handleDeleteUser = async (id:string) => {
    try {
      await deleteUser(id)
      setListUsers(prev => prev.filter(user => user._id !== id))
      setOpenConfirm(false)
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
  
  const filterLots = listUsers.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div className="flex flex-col w-full gap-2">
        <div className='flex justify-start items-center gap-5 w-full'>
            {(id && edit) && (
             <span className={`${hover} flex justify-start items-center`} onClick={() => {setId(''), setEdit(false)}}><ChevronLeft /> Назад</span>
            )}
            <h1 className='text-xl'>{edit ? t('admin', 'editUser') : t('admin', 'Users')}</h1>
            {!edit && (
            <div className='flex items-center p-2 border border-gray-300 gap-2 rounded-xl w-1/4'>
              <Search className='text-gray-500' size={20}/>
              <input className='outline-none w-full' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={t('admin', 'searchUser')}/>
            </div>
            )}
            {(message || error) && (
              <span className={`${animationScale} ${message ? 'text-green-500' : 'text-red-500'}`}>{message || error}</span>
            )}
        </div>
        {edit ? (
          <Setting id={id}/>
        ): (
          <div className="flex flex-col justify-start items-start">
            {filterLots.map((user) => (
              <>
              
               {openConfirm && (
                  <ConfirmWindow cancelAction={() => setOpenConfirm(false)} confirmAction={() => handleDeleteUser(user._id)} title={t('admin', 'confirmDeleteUser')}/>
                )}
              </>
            ))}
          </div>
        )}
    </div>
  )
}

