import { createContext, ReactNode, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
}

const SocketContext = createContext<SocketProps>({
    socket: null
})

export default function SocketIo({children}: {children:ReactNode}) {
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        socket = io(BASE_URL, {
            path: '/socket.io',
            transports: ["websocket"],
            auth: {token: localStorage.getItem('token')}
        })

        return () => {
            socket.
        }
    }, [BASE_URL])

  return (
    <div>
      
    </div>
  )
}
