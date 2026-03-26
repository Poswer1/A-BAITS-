import { getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';


export default async function page() {

  let listUser: UserTypes[] = []

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) return
    listUser = await getAllUser(token) 
  } catch (error) {
    listUser = []
  }

  return (
    <div className="flex flex-col w-full">
      <h1>Пользователи</h1>
      {listUser.map((user) => (
        <span key={user._id}>{user.name}</span>
      ))}
    </div>
  )
}
