import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default async function page() {

  try {
     const listUser = await getAllUser() 
  } catch (error) {
    
  }

  return (
    <div>
      
    </div>
  )
}
