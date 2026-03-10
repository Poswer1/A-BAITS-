import { createContext, ReactNode, useEffect } from "react"
import { Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
}

const SocketContext = createContext<SocketProps>({
    socket: null
})

export default function SocketIo({children}: {children:ReactNode}) {

    let socket = const socket = io('http://localhost:3002', {
    path: '/socket.io',
    transports: ["websocket"],
    auth: {token: localStorage.getItem('token')}
})

    useEffect(() => {

    })

  return (
    <div>
      
    </div>
  )
}
