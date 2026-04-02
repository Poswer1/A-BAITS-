'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'
import AvatarBlock from '../ui/avatar'
import { getRelativeTime } from '../ui/relativeTime'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { button } from '@/styles/global'
import { blockObj, textObj } from '@/styles/admin'
import { useState } from 'react'
import { changeStatus, TemporaryBlock } from '@/services/admin/user'
import Countdown from '../ui/countdown'
import { animationScale, hover } from '@/styles/style'
import { X } from 'lucide-react'

interface ControlOfViolationsProps {
    allViolations:ViolationsTypes[]
}

export default function ControlOfViolations({allViolations}: ControlOfViolationsProps) {
  
    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const [listAllViolations, setListAllViolations] = useState<ViolationsTypes[]>(allViolations || [])
    const [TemporarySelectTime, setTemporarySelectTime] = useState(false)
    const [TemporaryTime, setTemporaryTime] = useState(0)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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

      const handleTemporary = async (id:string) => {
        try {
            const day = Number(7)
            const data = await TemporaryBlock(id, day)
            setListAllViolations(prev => prev.map(v =>
                v.user._id === id ? {...v, user: {
                    ...v.user,
                    status: data.status,
                    UnblockDate: data.unBlockDate
                }}
                : v
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

  
    return (
    <div className='flex flex-col justify-start items-start gap-4 w-full'>
        <div className='flex justify-stat items-center gap-5 w-full'>
            <h1 className='text-xl'>{t('admin', 'ControlOfViolations')}</h1>
            {(message || error) && (
                <span className={`${animationScale} ${message ? 'text-green-500' : 'text-red-500'}`}>{message || error}</span>
             )}
        </div>
        <div className='flex flex-col justify-start items-start w-full'>
            {listAllViolations.map((v) => (
                <div key={v._id} className={blockObj}>
                    <div className='flex justify-start items-center gap-10'>
                            <div className='flex justify-start items-center gap-2'>
                            <AvatarBlock avatar={v.user.avatar} size='45'/>
                            <div className='flex flex-col justify-center'>
                                <h1>{v.user.name}</h1>
                                <span className='text-sm'>Ip - <span className='text-orange-600'>{v.user.ip}</span></span>
                            </div>
                        </div>
                        {v.user.status === 'Temporary' ? (
                            <span className={textObj}>{t('admin', 'TimeTemporaryUnBlock')} <br />
                            <span className='text-orange-600'><Countdown date={v.user.UnblockDate.toString()}/></span>
                            </span>
                        ): v.user.status === 'Blocked' &&(
                                <span className={textObj}>Статус <br/>
                                    <span className='text-sm w-30 text-red-500'>{t('admin', 'Lock')}</span>
                            </span>
                        )}
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        {TemporarySelectTime ? (
                            <>
                                <input 
                                className='outline-none p-2 border border-gray-300 rounded-md' 
                                placeholder={t('admin', 'TemporaryTime')} 
                                min={0} 
                                value={TemporaryTime}
                                onChange={(e) => setTemporaryTime(Number(e.target.value)}
                                />
                                <button onClick={() => handleTemporary(v.user._id)} className={`${button} bg-yellow-400 !p-2`}>{t('admin', 'Issue')}</button>
                                <X className={hover} onClick={() => setTemporarySelectTime(false)}/>
                            </>
                        ): (
                            <>
                                <Link href={`/${lang}/lot/${v.lot.lotNumber}`} className={textObj}>Лот <br /> <span className='text-black'>№</span> <span className='text-orange-600'>{v.lot.lotNumber}</span></Link>
                                <span className={textObj}>Тип <br /> <span className='text-red-500'>{v.violations}</span></span>
                                <span className={textObj}>{t('admin', 'Repeated')} <br /> <span className='text-black'>{v.repeated}</span></span>
                                <span className={textObj}>Дата <br /> <span className='text-black'>{getRelativeTime(v.createdAt, lang)}</span></span>
                                <button onClick={() => handleChangeStatus(v.user._id)} className={`${button} ${v.user.status === 'Blocked' ? '!bg-green-500' : '!bg-red-500'} ml-10 !p-2`}>{v.user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
                                <button onClick={() => setTemporarySelectTime(true)} className={`${button} bg-yellow-400 !p-2`}>{v.user.status === 'Temporary' ? t('admin', 'TemporaryUnBlock'): t('admin', 'TemporaryBlock')}</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

