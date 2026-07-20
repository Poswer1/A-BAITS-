import { useSocketContext } from '@/app/context/SocketIo'

export default function Online({id}: {id:string}) {

  const { onlineUser } = useSocketContext()

  const isOnline = Array.isArray(onlineUser) && onlineUser.includes(id)
  console.log(onlineUser)

  return (
    <span className="text-sm flex justify-center items-center gap-1">
     <span className={`${isOnline ? 'bg-green-500' : 'bg-red-500'} rounded-full p-1`}></span>
     {isOnline ? 'Онлайн': 'Офлайн'}
   </span>
  )
}
