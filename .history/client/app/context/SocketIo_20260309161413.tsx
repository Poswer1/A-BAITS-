import { createContext } from "react"

interface SocketPropps {
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
