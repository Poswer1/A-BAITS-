'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'
import AvatarBlock from '../ui/avatar'
import { getRelativeTime } from '../ui/relativeTime'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { button, overlay } from '@/styles/global'
import { blockObj, textObj } from '@/styles/admin'
import { useState, useEffect } from 'react'
import { changeStatus, TemporaryBlock } from '@/services/admin/user'
import Countdown from '../ui/countdown'
import { animationScale, hover } from '@/styles/style'
import { AlertTriangle, ArrowDown, ArrowUp, ArrowUpDown, Ban, Unlock, X } from 'lucide-react'
import TitleSection from './titleSection'
import Toast from '../ui/toast'
import Pagination from '../ui/pagination'

interface ControlOfViolationsProps {
    allViolations:ViolationsTypes[]
    total: number
    currentPage: number
    currentSort: string
    currentOrder: string
}

export default function ControlOfViolations({allViolations, total, currentPage, currentSort, currentOrder}: ControlOfViolationsProps) {
  
    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [listAllViolations, setListAllViolations] = useState<ViolationsTypes[]>(allViolations || [])
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setListAllViolations(allViolations || [])
    }, [allViolations])
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
      const p = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) p.set(key, value)
        else p.delete(key)
      })
      router.push(`${pathname}?${p.toString()}`)
    }

    const handleSort = (field: string) => {
      const newOrder = currentSort === field && currentOrder === 'desc' ? 'asc' : 'desc'
      updateUrl({ sort: field, order: newOrder, page: '1' })
    }

    const SortIcon = ({ field }: { field: string }) => {
      if (currentSort !== field) return <ArrowUpDown size={14} className="text-gray-400"/>
      return currentOrder === 'asc' ? <ArrowUp size={14} className="text-orange-600"/> : <ArrowDown size={14} className="text-orange-600"/>
    }

    const handleChangeStatus = async (id:string) => {
            try {
                const data = await changeStatus(id) 
                setListAllViolations(prev => prev.map(v =>
                    v.user._id === id ? {...v, user: {...v.user, status: data.status}} : v
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

      const handleTemporary = async (id:string, days: number) => {
        try {
            const data = await TemporaryBlock(id, days)
            setListAllViolations(prev => prev.map(v =>
                v.user._id === id ? {...v, user: {
                    ...v.user,
                    status: data.status,
                    UnblockDate: data.unBlockDate
                }}
                : v
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
    <div className='flex flex-col gap-2 w-full'>
        <TitleSection title={t('admin', 'ControlOfViolations')}/>
        <div className="flex flex-wrap gap-2 px-2 md:px-0">
          <button onClick={() => handleSort('createdAt')} className={sortButtonClass}>
            Дата <SortIcon field="createdAt"/>
          </button>
          <button onClick={() => handleSort('repeated')} className={sortButtonClass}>
            Повторы <SortIcon field="repeated"/>
          </button>
          <button onClick={() => handleSort('violations')} className={sortButtonClass}>
            Тип <SortIcon field="violations"/>
          </button>
        </div>
        <div className='flex flex-col justify-start items-start w-full'>
            {listAllViolations.map((v) => {
                 const date = v.createdAt 
                ? new Date(v.createdAt).toLocaleDateString('en-CA') 
                : 'Даты нету';
                return (
                    <div key={v._id} className={blockObj}>
                        <div className='flex justify-start items-center gap-5 whitespace-nowrap mr-5'>
                            <div className='flex justify-start items-center gap-2 w-full'>
                                <AvatarBlock avatar={v.user.avatar} size='45'/>
                                <div className='flex flex-col justify-center'>
                                    <h1>{v.user.name}</h1>
                                    <span className='text-sm'>Ip - <span className='text-orange-600'>{v.user.ip}</span></span>
                                </div>
                            </div>
                            {v.user.status === 'Temporary' ? (
                                <span className={'w-full text-sm'}>{t('admin', 'TimeTemporaryUnBlock')} <br />
                                <span className='text-orange-600'><Countdown date={v.user.UnblockDate.toString()}/></span>
                                </span>
                            ): v.user.status === 'Blocked' &&(
                                    <span className={textObj}>Статус <br/>
                                        <span className='text-sm w-30 text-red-500'>{t('admin', 'Lock')}</span>
                                </span>
                            )}
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <Link href={`/${lang}/lot/${v.lot?.lotNumber}`} className={textObj}>Лот <br /> <span className='text-black'>№</span> <span className='text-orange-600'>{v.lot?.lotNumber}</span></Link>
                            <span className={textObj}>Тип <br /> <span className='text-red-500'>{v.violations}</span></span>
                            <span className={textObj}>{t('admin', 'Repeated')} <br /> <span className='text-black'>{v.repeated}</span></span>
                            <span className={textObj}>Дата <br /> <span className='text-black'>{date}</span></span>
                            <button onClick={() => handleChangeStatus(v.user._id)} className={`${button} ${v.user.status === 'Blocked' ? '!bg-green-500' : '!bg-red-500'} ml-10 !p-2`}>{v.user.status === 'Blocked' ? <Unlock /> : <Ban/>}</button>
                            <button onClick={() => {
                              if (v.user.status === 'Temporary') {
                                handleTemporary(v.user._id, 7)
                              } else {
                                setOpenBanModal(v.user._id)
                              }
                            }} className={`${button} bg-yellow-400 !p-2`}>{v.user.status === 'Temporary' ? <Unlock /> : <AlertTriangle/>}</button>
                        </div>
                    </div>
                )
            })}
        </div>
        <Pagination total={total} maxLot={20}/>
        <Toast message={message} error={error}/>
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
    </div>
  )
}

