import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { data } from "react-router-dom"
import { io, Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
    onlineUser: string[]
}

const SocketContext = createContext<SocketProps>({
    socket: null,
    onlineUser: []
})

export default function SocketIo({children}: {children:ReactNode}) {
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUser, setOnlineUser] = useState<string[] | null>([])

    useEffect(() => {
        const s = io(BASE_URL, {
            path: '/socket.io',
            transports: ["websocket"],
            withCredentials: true
        })
        setSocket(s)
        
        s.emit('ConnectOnlineUser')
        s.on('onlineUser', (data) => {
            setOnlineUser(data)
        })

        return () => {
            s.disconnect()
        }
    }, [BASE_URL])

  return (
   <SocketContext.Provider value={{socket,onlineUser}}>
    {children}
   </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
