import Notification from "@/components/admin/notification";
import { getAllUser } from "@/services/admin/user"
import { cookies } from 'next/headers';


export default  async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if(!token) {
    console.log('ТОКЕН НЕ ПОЛУЧЕН')
    return
  }

  const allUser = await getAllUser(token)

  return (
      <Notification allUser={allUser}/>
  )
}

