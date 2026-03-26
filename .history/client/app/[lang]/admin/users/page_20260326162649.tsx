import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default async function page() {

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) return
    const listUser = 
    const listUser = await getAllUser() 
  } catch (error) {
    
  }

  return (
    <div>
      
    </div>
  )
}
