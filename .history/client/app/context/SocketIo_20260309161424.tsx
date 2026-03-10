import { createContext } from "react"

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
