import { createContext } from "react"
import { Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket | null
}

const SocketContext = createContext<SocketProps>({
    socket: null
})

export default function SocketIo() {
  return (
    <div>
      
    </div>
  )
}
