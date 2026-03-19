import { useSocketContext } from '@/app/context/SocketIo'
import { useTranslation } from '@/app/context/TranslationProvider'
import { button } from '@/styles/global'
import { NotificationTypes } from '@/types/types'
import { useClickOutside } from '@/utils/useClickOutside'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface OpenNotification {
    setOpen:(t:boolean) => void
    setRead:(t:boolean) => void
    lang:string
}

export default function OpenNotification({setOpen, lang, setRead}: OpenNotification) {

    const {t} = useTranslation()
    const {socket} = useSocketContext()
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState<NotificationTypes[]>([])

    useEffect(() => {
        if(!socket) return

        socket.on('newNotification', (data) => {
            setNotification(prev => [...prev, data])
        })
        
        socket.emit('listenHistory')
        socket.on('historyNotification', (data) => {
            setNotification(data)
            setLoading(false)
        })

        socket.emit('readNotification')
        socket.on('read', () => {
            setRead(false)
        })

        return () => {
            socket.off('newNotification')
        }

    }, [socket])

    const modalRef = useClickOutside(setOpen)

  return (
    <div ref={modalRef} className='flex flex-col justify-start items-start bg-white p-2 w-100 absolute top-[100%] left-[full] rounded-md gap-2 z-30 text-black'>
        {loading ? (
            <h1>{t('header', 'loading')}</h1>
        ): (
            <>
                <h1 className='font-bold'>{t('header', 'notification')}</h1>
                {notification.length === 0 && (
                    <h1>{t('header', 'notificationNoYet')}</h1>
                )}
                {notification.map((n) => (
                    <Link href={`/${lang}/lot/${n?.lot?.lotNumber || '0000'}`} onClick={() => setOpen(false)} key={n._id} className='w-full cursor-pointer'>
                        <p className='text-gray-800 whitespace-pre-line'>
                        {t('header', n.notification)}
                        </p>
                        {n?.lot?.name && (
                        <p className='text-orange-600 font-medium whitespace-pre-line'>
                            {n.lot?.name}
                        </p>
                        )}
                        <Link href='' className={`${button} w-full !p-1 mt-1`} onClick={(e) => e.preventDefault()}>Перейти в чат</Link>
                    </Link>
                ))}
            </>
        )}
    </div>
  )
}

