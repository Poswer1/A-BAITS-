'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { blockObj, textObj } from '@/styles/admin'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AvatarBlock from '../ui/avatar'

interface LoggingProps {
    allLogging: {
        _id:string, 
        createdAt:Date,
        user:{
            avatar:string, 
            name:string, 
            ip:string,
        }, 
        action:string,
        lot: {lotNumber:string}
    }[]
}

export default function Logging({allLogging}:LoggingProps) {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

  return (
    <div className='flex flex-col gap-2 w-full'>
      <h1 className='text-xl'>{t('admin', 'Logging')}</h1>
      <div className='flex flex-col w-full'>
        <div></div>
        {allLogging.map((log) => {
             const date = log.createdAt 
            ? new Date(log.createdAt).toLocaleDateString('en-CA') 
            : 'Даты нету';
            return (
                <div className={blockObj}>
                <div className='flex gap-2 items-center'>
                    <AvatarBlock avatar={log.user.avatar} size='45'/>
                    <span>{log.user.name}</span>
                    <p className='text-orange-600'>{t('admin', log.action)} <Link href={`/${lang}/lot/${log.lot.lotNumber}`} className='font-bold border-b-2'>{log.lot.lotNumber}</Link></p>
                </div>
                <span className={textObj}>Дата: <br /> <span className='text-black'>{date}</span></span>
                </div>
            )
        })}
      </div>
    </div>
  )
}

