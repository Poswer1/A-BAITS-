import { useSocketContext } from '@/app/context/SocketIo'
import { useTranslation } from '@/app/context/TranslationProvider'
import React, { useEffect } from 'react'

export default function OpenNotification() {

    const {t} = useTranslation()
    const {socket} = useSocketContext()

    useEffect(() => {

    }, [socket])

  return (
    <div className='flex flex-col justify-start items-start bg-gray-200 p-2 w-full absolute top-[100%] left-0'>
        <h1>{t('header', 'notification')}</h1>
    </div>
  )
}

