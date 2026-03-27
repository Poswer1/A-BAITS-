import AvatarBlock from "@/components/ui/avatar";
import { getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';
import { Link } from "react-router-dom";


export default async function page() {

  let listUser: UserTypes[] = []

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    listUser = await getAllUser(token) 
  } catch (error) {
    listUser = []
  }

  return (
    <div className="flex flex-col w-full">
      <h1>Пользователи</h1>
      <div className="flex flex-col justify-start items-start gap-2">
        {listUser.map((user) => (
          <div className="flex justify-start items-center gap-2">
            <Link>
            </Link>
            <AvatarBlock avatar={user.avatar} size="45"/>
            <span key={user._id}>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
