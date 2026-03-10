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
        socket.on('historyNotification', (data) => {
            setNotification(data)
        })

        return () => {
            socket.off('newNotification')
        }

    }, [socket])

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
  <h2 className="px-4 py-2 bg-gray-50 text-gray-800 font-semibold border-b border-gray-200">
    {t('header', 'notification')}
  </h2>
  <div className="flex flex-col divide-y divide-gray-200 max-h-60 overflow-y-auto">
    {notification.map((n, idx) => (
      <div
        key={idx}
        className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-start"
      >
        <span className="text-gray-700 whitespace-pre-line">
          {t('header', n.notification)}
        </span>
        {n?.lot?.name && (
          <span className="text-orange-600 font-medium ml-2 whitespace-pre-line">
            {n.lot.name}
          </span>
        )}
      </div>
    ))}
  </div>
</div>
  )
}

