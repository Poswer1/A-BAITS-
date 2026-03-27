import User from "@/components/admin/user";
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
  
  return (
    <User listUser={listUser}/>
  )
}
