'use client'

import { UserTypes } from '@/types/types'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'
import {useState, useEffect } from 'react'
import { changeStatus, deleteUser, TemporaryBlock, updateBalance } from '@/services/admin/user'
import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import Setting from '../profile/setting'
import { AlertTriangle, ArrowDown, ArrowUp, ArrowUpDown, Ban, ChevronLeft, Delete, Edit, Edit2, Search, Trash, Trash2, Unlock, Wallet, X } from 'lucide-react'
import ConfirmWindow from './confirmWindow'
import { blockObj, textObj } from '@/styles/admin'
import Countdown from '../ui/countdown'
import { button, overlay } from '@/styles/global'
import SearchBlock from '../ui/search'
import Toast from '../ui/toast'
import TitleSection from './titleSection'
import InputField from '../ui/inputFields'
import Pagination from '../ui/pagination'

interface listUserProps {
    listUser: UserTypes[]
    total: number
    currentPage: number
    currentSort: string
    currentOrder: string
    currentSearch: string
}

export default  function User({listUser, total, currentPage, currentSort, currentOrder, currentSearch}: listUserProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const params = useParams()
    const lang = params.lang as string 
    
    const [listUsers, setListUsers] = useState(listUser)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setListUsers(listUser)
    }, [listUser])
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    const [newBalance, setNewBalance] = useState(0)
    const [searchValue, setSearchValue] = useState(currentSearch)
    const [balanceEdit, setBalanceEdit] = useState('')
    const [balanceType, setBalanceType] = useState('')
    const [openConfirm, setOpenConfirm] = useState(false)
    const [banDays, setBanDays] = useState(7)
    const [openBanModal, setOpenBanModal] = useState('')

    const banOptions = [
      { label: '1 день', value: 1 },
      { label: '3 дня', value: 3 },
      { label: '7 дней', value: 7 },
      { label: '14 дней', value: 14 },
      { label: '30 дней', value: 30 },
      { label: '90 дней', value: 90 },
    ]

    const updateUrl = (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      router.push(`${pathname}?${params.toString()}`)
    }

    const handleSort = (field: string) => {
      const newOrder = currentSort === field && currentOrder === 'desc' ? 'asc' : 'desc'
      updateUrl({ sort: field, order: newOrder, page: '1' })
    }

    const handleSearch = (value: string) => {
      setSearchValue(value)
      // Debounced search via URL
      const timer = setTimeout(() => {
        updateUrl({ search: value, page: '1' })
      }, 500)
      return () => clearTimeout(timer)
    }

    const SortIcon = ({ field }: { field: string }) => {
      if (currentSort !== field) return <ArrowUpDown size={14} className="text-gray-400"/>
      return currentOrder === 'asc' ? <ArrowUp size={14} className="text-orange-600"/> : <ArrowDown size={14} className="text-orange-600"/>
    }

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

   const handleTemporary = async (userId:string, days: number) => {
      try {
        const data = await TemporaryBlock(userId, days)
          setListUsers(prev => prev.map(u =>
                u._id === userId ? {...u, status: data.status, UnblockDate: data.unBlockDate} : u
          ))
          const successMessage = data.status === 'Temporary' ? `${t('admin', 'TemporaryBlockMessage')} ${days} ` : t('admin', 'TemporaryUnBlockMessage')
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
          setOpenBanModal('')
        }

  const sortButtonClass = `${hover} flex items-center gap-1 px-3 py-1 rounded-md bg-white text-sm whitespace-nowrap shadow-sm`

  return (
    <div className="flex flex-col w-full gap-2">
      <TitleSection 
      title={edit ? t('admin', 'editUser') : t('admin', 'Users')} 
      searchValue={searchValue} 
      setSearchValue={handleSearch} 
      placeholderSearch={t('admin', 'searchUser')}
      edit={edit}
      setEdit={setEdit}
      />
      {!edit && (
        <div className="flex flex-wrap gap-2 px-2 md:px-0">
          <button onClick={() => handleSort('name')} className={sortButtonClass}>
            Имя <SortIcon field="name"/>
          </button>
          <button onClick={() => handleSort('createdAt')} className={sortButtonClass}>
            Дата <SortIcon field="createdAt"/>
          </button>
          <button onClick={() => handleSort('balance')} className={sortButtonClass}>
            Баланс <SortIcon field="balance"/>
          </button>
          <button onClick={() => handleSort('status')} className={sortButtonClass}>
            Статус <SortIcon field="status"/>
          </button>
        </div>
      )}
        {edit ? (
          <Setting id={id} mode='admin'/>
        ): (
          <div className="flex flex-col justify-start items-start">
            {listUsers.map((user) => {
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
                    <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? <Unlock /> : <Ban />}</button>
                    <button onClick={() => {
                      if (user.status === 'Temporary') {
                        handleTemporary(user._id, 7)
                      } else {
                        setOpenBanModal(user._id)
                      }
                    }} className={`${button} bg-yellow-400 !p-2`}>{user.status === 'Temporary' ? <Unlock /> : <AlertTriangle />}</button>
                    <button className={`${hover}`} onClick={() => {setId(user._id), setEdit(true)}}><Edit2/></button>
                    <span className={`${hover} text-red-500`} onClick={() => {setOpenConfirm(true), setId(user._id)}}><Trash2 /></span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <Pagination total={total} maxLot={20}/>
        <Toast message={message} error={error}/>
        {openConfirm && (
         <ConfirmWindow cancelAction={() => setOpenConfirm(false)} confirmAction={() => handleDeleteUser(id)} title={t('admin', 'confirmDeleteUser')}/>
        )}
        {openBanModal && (
          <div className={overlay} onClick={() => setOpenBanModal('')}>
            <div onClick={(e) => e.stopPropagation()} className={`${animationScale} flex flex-col justify-center items-start p-5 bg-white rounded-xl w-[90%] md:w-1/4 gap-3`}>
              <h1 className='text-xl font-bold'>{t('admin', 'TemporaryBlockTitle') || 'Временная блокировка'}</h1>
              <p className='text-sm text-gray-500'>{t('admin', 'selectBanDuration') || 'Выберите срок блокировки'}</p>
              <div className="flex flex-wrap gap-2 w-full">
                {banOptions.map(opt => (
                  <button 
                    key={opt.value}
                    onClick={() => setBanDays(opt.value)} 
                    className={`${hover} px-4 py-2 rounded-md text-sm font-medium transition-all ${banDays === opt.value ? 'bg-orange-600 text-white' : 'bg-gray-100 text-black'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button onClick={() => handleTemporary(openBanModal, banDays)} className={`${button} w-full mt-2`}>
                {t('admin', 'confirm') || 'Подтвердить'}
              </button>
            </div>
          </div>
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
                  <button onClick={() => setBalanceType('Deposit')} className={`${button} w-full`}>{t('admin', 'Deposit')}</button>
                  <button onClick={() => setBalanceType('Debit')} className={`${button} !bg-gray-200 !text-black w-full`}>{t('admin', 'Debit')}</button>
                </>
              )}
            </div>
          </div>
        )}
    </div>
  )
}


