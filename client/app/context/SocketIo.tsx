import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { getStatusAuth } from "@/services/auth"

interface SocketProps {
    socket: Socket | null
    onlineUser: string[]
}

const SocketContext = createContext<SocketProps>({
    socket: null,
    onlineUser:[]
})

export default function SocketIo({children}: {children:ReactNode}) {
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUser, setOnlineUser] = useState<string[]>([])

    useEffect(() => {
        let currentSocket: Socket | null = null
        let requestId = 0
        let disposed = false

        const syncSocket = async () => {
            const currentRequestId = ++requestId

            try {
                const isAuthenticated = await getStatusAuth()
                if (disposed || currentRequestId !== requestId) return

                currentSocket?.disconnect()
                currentSocket = null
                setSocket(null)
                setOnlineUser([])

                if (!isAuthenticated) return
                if (!BASE_URL) {
                    console.error('NEXT_PUBLIC_URL не задан: WebSocket не подключен')
                    return
                }

                let socketUrl: URL
                try {
                    socketUrl = new URL(BASE_URL)
                } catch {
                    console.error('NEXT_PUBLIC_URL должен быть абсолютным URL: WebSocket не подключен')
                    return
                }

                const socketPath = `${socketUrl.pathname.replace(/\/+$/, '')}/socket.io`
                const nextSocket = io(socketUrl.origin, {
                    path: socketPath,
                    transports: ["websocket"],
                    withCredentials: true,
                })
                currentSocket = nextSocket
                setSocket(nextSocket)

                nextSocket.on('current-online', (data: string[]) => {
                    setOnlineUser(data)
                })
                nextSocket.on('user-online', (data: string) => {
                    setOnlineUser(prev => [...prev, data])
                })
                nextSocket.on('connect_error', (error) => {
                    console.error('Ошибка подключения WebSocket:', error.message)
                })
            } catch (error) {
                if (disposed || currentRequestId !== requestId) return
                console.error('Не удалось проверить авторизацию для WebSocket:', error)
                currentSocket?.disconnect()
                currentSocket = null
                setSocket(null)
            }
        }

        const handleAuthChange = () => {
            void syncSocket()
        }

        void syncSocket()
        window.addEventListener('auth-change', handleAuthChange)

        return () => {
            disposed = true
            requestId++
            window.removeEventListener('auth-change', handleAuthChange)
            currentSocket?.disconnect()
        }
    }, [BASE_URL])

  return (
   <SocketContext.Provider value={{ socket, onlineUser}}>
    {children}
   </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
