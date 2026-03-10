import { createContext } from "react"

interface SocketPropps {
    socket: Socket
}

const SocketContext = createContext<SocketPropps>({

})

export default function SocketIo() {
  return (
    <div>
      
    </div>
  )
}
