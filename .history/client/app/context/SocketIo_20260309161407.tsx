import { createContext } from "react"

interface Socket {
    socket: Socket
}

const SocketContext = createContext<Socket>({
    
})

export default function SocketIo() {
  return (
    <div>
      
    </div>
  )
}
