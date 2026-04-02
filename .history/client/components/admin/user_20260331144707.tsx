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
              <div key={user._id} className="flex justify-between items-center gap-4 bg-white w-full p-2 border-t border-b border-gray-200 h-20">
                <div className='flex justify-start items-center gap-4'>
                  <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
                    <AvatarBlock avatar={user.avatar} size="45"/>
                    <div className='flex flex-col'>
                      <span key={user._id}>{user.name}</span>
                      <span>ip{user.ip}</span>
                    </div>
                  </Link>
                  <span className='text-sm text-gray-500'>Баланс: <br /> <span className='text-orange-600'>{user.balance} ₴</span></span>
                </div>
                <div className={`justify-start items-center gap-4 ${user._id === balanceEdit ? 'hidden' : 'flex'}`}>
                  <button onClick={() => setBalanceEdit(user._id)} className={`${hover} rounded-md !p-2 bg-gray-100`}>{t('admin', 'balance')}</button>
                  <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
                  <button className={`${hover}`} onClick={() => {setId(user._id), setEdit(true)}}>{t('admin', 'edit')}</button>
                  <span className={`${hover} text-red-500`} onClick={() => setOpenConfirm(true)}>{t('admin', 'delete')}</span>
                </div>
                <div className={`justify-start items-center gap-4 ${user._id === balanceEdit ? 'flex' : 'hidden'}`}>
                  <input type="number" className='outline-none border border-gray-300 rounded-md p-2' 
                  defaultValue={user.balance} 
                  value={newBalance}
                  onChange={(e) => setNewBalance(Number(e.target.value))} />
                  <button onClick={() => handleUpdateBalance(user._id)} className={`${hover} bg-gray-100 rounded-md !p-2`}>{t('admin', 'saveBalance')}</button>
                  <X className={hover} onClick={() => setBalanceEdit('')}/>
                </div>
              </div>
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

