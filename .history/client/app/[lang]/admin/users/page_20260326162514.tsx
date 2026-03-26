import { getAllUser } from "@/services/admin/user"


export default async function page() {

  const listUser = await getAllUser

  return (
    <div>
      
    </div>
  )
}
