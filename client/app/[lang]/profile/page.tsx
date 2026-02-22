'use client'

import AvatarBlock from "@/components/utils/avatar"
import { getUserById} from "@/services/user"
import { useEffect, useState } from "react"

function page() {
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) return
    getUserById(token)
    .then(data => {
      setUser(data)
    })
  }, [])

  return (
    <div className="flex justify-center items-start w-full h-full">
      <div className="flex justify-center items-center bg-white p-2 rounded-md gap-2">
        {AvatarBlock(user?.avatar, '60')}
        <h1 className="text-lg font-bold">{user?.name}</h1>
      </div>
    </div>
  )
}

export default page
