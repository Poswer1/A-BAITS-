import User from "@/components/admin/user";
import AvatarBlock from "@/components/ui/avatar";
import { changeStatus, getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';


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
    <User listUser={listUser}/>
  )
}
