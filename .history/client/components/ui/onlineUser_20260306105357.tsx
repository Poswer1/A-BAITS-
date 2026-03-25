import React, { useState } from 'react'


export default function OlnlineUser({id}: {id:string}) {

  const [onlineUser, setOnlineUser] = useState<any[]>([]) 

  return (
    <span className="text-sm flex justify-center items-center gap-1">
     <span className={`${onlineUser.includes(id) ? 'bg-green-600' : 'bg-red-500'} rounded-full p-1`}></span>
     {onlineUser.includes(id) ? 'Онлайн': 'Офлайн'}
   </span>
  )
}
