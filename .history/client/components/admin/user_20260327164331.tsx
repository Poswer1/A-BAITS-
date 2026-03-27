import { UserTypes } from '@/types/types'
import React from 'react'

interface listUserProps {
    listUser: UserTypes[]
}

export default  function User({li}) {
  return (
    <div className="flex flex-col w-full">
      <h1>Пользователи</h1>
      <div className="flex flex-col justify-start items-start gap-4">
        {listUser.map((user) => (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/${lang}/profile/${user.name}`} className="flex justify-center items-center gap-2">
              <AvatarBlock avatar={user.avatar} size="45"/>
              <span key={user._id}>{user.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

