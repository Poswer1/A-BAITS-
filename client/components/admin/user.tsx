'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import {useState } from 'react'
import { changeStatus, deleteUser, TemporaryBlock, updateBalance } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import Setting from '../profile/setting'
import { AlertTriangle, Ban, ChevronLeft, Delete, Edit, Edit2, Search, Trash, Trash2, Unlock, Wallet, X } from 'lucide-react'
import ConfirmWindow from './confirmWindow'
import { blockObj, textObj } from '@/styles/admin'
import Countdown from '../ui/countdown'
import { button, overlay } from '@/styles/global'
import SearchBlock from '../ui/search'
import Toast from '../ui/toast'
import TitleSection from './titleSection'
import InputField from '../ui/inputFields'

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
    const [balanceType, setBalanceType] = useState('')
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

  const handleUpdateBalance = async () => {
    if(!balanceEdit) return
    try {
      const data = await updateBalance(balanceEdit, newBalance, balanceType)
      setListUsers(prev => prev.map(user => user._id === balanceEdit ? {...user, balance: data.balance} : user))
      setBalanceEdit('')
      setBalanceType('')
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

   const handleTemporary = async (id:string) => {
      try {
        const day = Number(7)
        const data = await TemporaryBlock(id, day)
          setListUsers(prev => prev.map(u =>
                u._id === id ? {...u, status: data.status, UnblockDate: data.unBlockDate} : u
          ))
          const successMessage = data.status === 'Temporary' ? `${t('admin', 'TemporaryBlockMessage')} ${day} ` : t('admin', 'TemporaryUnBlockMessage')
          setMessage(successMessage)
            setTimeout(() => {
              setMessage('')
          }, 3000)
          } catch (error:any) {
            setError(t('admin', error.message))
            console.log('error Temporary', error)
            setTimeout(() => {
              setError('')
            }, 3000)
          }
        }
  
  const filterLots = listUsers.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  )


  return (
    <div className="flex flex-col w-full gap-2">
      <TitleSection 
      title={edit ? t('admin', 'editUser') : t('admin', 'Users')} 
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      placeholderSearch={t('admin', 'searchUser')}
      edit={edit}
      setEdit={setEdit}
      />
        {edit ? (
          <Setting id={id}/>
        ): (
          <div className="flex flex-col justify-start items-start">
            {filterLots.map((user) => {
              const balanceUser = Math.floor(Number(user.balance) * 10) / 10
              return (
                <div key={user._id} className={blockObj}>
                  <div className='flex justify-start items-center gap-4'>
                    <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
                      <AvatarBlock avatar={user.avatar} size="45"/>
                      <div className='flex flex-col'>
                        <span key={user._id}>{user.name}</span>
                        <span className='text-sm'>Ip:<span className='text-orange-600'>{user.ip || 'empty'}</span></span>
                      </div>
                    </Link>
                    <span className={textObj}>Баланс: <br /> <span className='text-orange-600'>{balanceUser} ₴</span></span>
                    {user.status === 'Temporary' ? (
                      <span className={textObj}>{t('admin', 'TimeTemporaryUnBlock')} <br />
                        <span className='text-orange-600'><Countdown date={user.UnblockDate.toString()}/></span>
                      </span>
                    ): user.status === 'Blocked' &&(
                      <span className={textObj}>Статус <br/>
                      <span className='text-sm w-30 text-red-500'>{t('admin', 'Lock')}</span>
                      </span>
                    )}
                  </div>
                  <div className={`justify-start items-center gap-4 flex`}>
                    <button onClick={() => setBalanceEdit(user._id)} className={`${hover} rounded-md !p-2 bg-gray-100`}><Wallet /></button>
                    <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? <Unlock />: <Ban />}</button>
                    <button onClick={() => handleTemporary(user._id)} className={`${button} bg-yellow-400 !p-2`}>{user.status === 'Temporary' ? <Unlock /> : <AlertTriangle />}</button>
                    <button className={`${hover}`} onClick={() => {setId(user._id), setEdit(true)}}><Edit2/></button>
                    <span className={`${hover} text-red-500`} onClick={() => {setOpenConfirm(true), setId(user._id)}}><Trash2 /></span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <Toast message={message} error={error}/>
        {openConfirm && (
         <ConfirmWindow cancelAction={() => setOpenConfirm(false)} confirmAction={() => handleDeleteUser(id)} title={t('admin', 'confirmDeleteUser')}/>
        )}
        {balanceEdit && (
          <div className={overlay} onClick={() => {setBalanceEdit(''), setBalanceType('')}}>
            <div onClick={(e) => e.stopPropagation()} className={`${animationScale} flex flex-col justify-center items-start p-2 bg-white rounded-xl w-[90%] md:w-1/4 gap-2`}>
              <h1 className='text-xl'>{balanceType ? t('admin', balanceType) :  t('admin', 'selectTypeBalance')}</h1>
              {balanceType ? (
                <>
                  <InputField label='' placeholder={t('admin', balanceType)} type='number' value={newBalance} onChange={setNewBalance}/>
                  <button onClick={handleUpdateBalance} className={`${button} w-full`}>{t('admin', balanceType)}</button>
                </>
              ): (
                <>
                  <button onClick={() => setBalanceType('Deposite')} className={`${button} w-full`}>{t('admin', 'Deposite')}</button>
                  <button onClick={() => setBalanceType('Debit')} className={`${button} !bg-gray-200 !text-black w-full`}>{t('admin', 'Debit')}</button>
                </>
              )}
            </div>
          </div>
        )}
    </div>
  )
}

