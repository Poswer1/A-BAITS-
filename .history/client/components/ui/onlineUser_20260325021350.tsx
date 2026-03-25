import { useSocketContext } from '@/app/context/SocketIo'

export default function Online({id}: {id:string}) {

  const { onlineUser } = useSocketContext()

  return (
    <span className="text-sm flex justify-center items-center gap-1">
     <span className={`${onlineUser?.includes(id) ? 'bg-green-600' : 'bg-red-500'} rounded-full p-1`}></span>
     {onlineUser?.includes(id) ? 'Онлайн': 'Офлайн'}
   </span>
  )
}
