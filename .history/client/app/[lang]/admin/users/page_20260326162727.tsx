import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default async function page() {

  let listUser: UserT = []

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) return
    listUser = await getAllUser(token) 
  } catch (error) {
    listUser = []
  }

  return (
    <div>
      
    </div>
  )
}
