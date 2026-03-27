import AvatarBlock from "@/components/ui/avatar";
import { changeStatus, getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';
import Link from "next/link";

interface pageProps {
  params: {
    lang:string
  }
}

export default async function page({params}: pageProps) {

  let listUser: UserTypes[] = []

  const param = await params
  const lang = param.lang as string

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

  let statusUser = ''

  const handleChangeStatus = async (id:string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const data = await changeStatus(token, id)

  }

  return (
    <div className="flex flex-col w-full">
      <h1>Пользователи</h1>
      <div className="flex flex-col justify-start items-start gap-4">
        {listUser.map((user) => (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/${lang}/profile/${user.name}`} className="flex justify-center items-center gap-2">
              <AvatarBlock avatar={user.avatar} size="45"/>
              <span key={user._id}>{user.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
