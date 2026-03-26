import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default async function page() {

  try {
    const cookieStore = await cookies()
    const listUser = await getAllUser() 
  } catch (error) {
    
  }

  return (
    <div>
      
    </div>
  )
}
