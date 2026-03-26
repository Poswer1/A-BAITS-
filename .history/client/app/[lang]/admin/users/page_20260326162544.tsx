import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default async function page() {

  try {
    
  } catch (error) {
    
  }
  const listUser = await getAllUser()

  return (
    <div>
      
    </div>
  )
}
