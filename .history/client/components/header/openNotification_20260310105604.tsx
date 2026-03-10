import { useSocketContext } from '@/app/context/SocketIo'
import { useTranslation } from '@/app/context/TranslationProvider'
import React, { useEffect, useState } from 'react'

export default function OpenNotification() {

    const {t} = useTranslation()
    const {socket} = useSocketContext()
    const [notification, setNotification] = useState<

    useEffect(() => {
        if(!socket) return



    }, [socket])

  return (
    <div className='flex flex-col justify-start items-start bg-gray-100 p-2 w-full absolute top-[100%] left-0 rounded-md'>
        <h1>{t('header', 'notification')}</h1>
    </div>
  )
}

