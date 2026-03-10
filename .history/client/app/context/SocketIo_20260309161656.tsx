import { createContext, ReactNode, useEffect } from "react"
import { io, Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
}

const SocketContext = createContext<SocketProps>({
    socket: null
})

export default function SocketIo({children}: {children:ReactNode}) {

    let socket:

    useEffect(() => {

    })

  return (
    <div>
      
    </div>
  )
}
