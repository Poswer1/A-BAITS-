import { getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';


export default async function page() {

  let listUser: UserTypes[] = []
  const BASE_URL = process.env.NEXT_PUBLIC_URL

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
      {listUser.map((user) => (
        <div className="flex justify-center items-center">
        </div>
        <img src={`${BASE_URL}${user.avatar}`}/>
        <span key={user._id}>{user.name}</span>
      ))}
    </div>
  )
}
