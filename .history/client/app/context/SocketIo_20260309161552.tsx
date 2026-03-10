import { createContext, ReactNode } from "react"
import { Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
}

const SocketContext = createContext<SocketProps>({
    socket: null
})

export default function SocketIo({children}: {children:ReactNode}) {
  return (
    <div>
      
    </div>
  )
}
