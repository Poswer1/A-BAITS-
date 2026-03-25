'use client'

import { useSocketContext } from '@/app/context/SocketIo'
import React, { useEffect, useState } from 'react'


export default function OlnlineUser({id}: {id:string}) {

  const { socket } = useSocketContext()

  const [onlineUser, setOnlineUser] = useState<any[] | null>([])

  useEffect(() => {
    if(!socket) return

    socket.on('onlineUser', (data) => {
      setOnlineUser(data)
    })

    socket.emit('ConnectOnlineUser')

    return () => {
      socket.disconnect()
    }

  }, [socket])

  return (
    <span className="text-sm flex justify-center items-center gap-1">
     <span className={`${onlineUser.includes(id) ? 'bg-green-600' : 'bg-red-500'} rounded-full p-1`}></span>
     {onlineUser.includes(id) ? 'Онлайн': 'Офлайн'}
   </span>
  )
}
