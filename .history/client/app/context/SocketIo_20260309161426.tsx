import { createContext } from "react"
import { Socket } from "socket.io-client"

interface SocketProps {
    socket: Socket
}

const SocketContext = createContext<SocketProps>({

})

export default function SocketIo() {
  return (
    <div>
      
    </div>
  )
}
