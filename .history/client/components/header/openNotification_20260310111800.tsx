import { useSocketContext } from '@/app/context/SocketIo'
import { useTranslation } from '@/app/context/TranslationProvider'
import { NotificationTypes } from '@/types/types'
import React, { useEffect, useState } from 'react'

export default function OpenNotification() {

    const {t} = useTranslation()
    const {socket} = useSocketContext()
    const [notification, setNotification] = useState<NotificationTypes[]>([])

    useEffect(() => {
        if(!socket) return

        socket.on('newNotification', (data) => {
            setNotification(prev => [...prev, data])
        })
        
        socket.emit('listenHistory')
        socket.on('historyNotification')

        return () => {
            socket.off('newNotification')
        }

    }, [socket])

  return (
    <div className='flex flex-col justify-start items-start bg-gray-100 p-2 w-full absolute top-[100%] left-0 rounded-md'>
        <h1>{t('header', 'notification')}</h1>
        {notification.map((n) => (
            <span>{t('header', n.notification)} <span className='text-orange-600'>{n?.lot?.name}</span></span>
        ))}
    </div>
  )
}

