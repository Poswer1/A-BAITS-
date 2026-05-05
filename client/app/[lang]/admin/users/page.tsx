import User from "@/components/admin/user";
import { getAllUser } from "@/services/admin/user"
import { UserTypes } from "@/types/types";
import { cookies } from 'next/headers';


export default async function page({searchParams}: {searchParams: {page?:string, sort?:string, order?:string, search?:string}}) {

  const params = await searchParams
  const page = Number(params.page) || 1
  const sort = params.sort || 'createdAt'
  const order = params.order || 'desc'
  const search = params.search || ''

  let listUser: UserTypes[] = []
  let total = 0

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const data = await getAllUser(token, page, sort, order, search) 
    listUser = data.users || []
    total = data.total || 0
  } catch (error) {
    listUser = []
  }

  return (
    <User listUser={listUser} total={total} currentPage={page} currentSort={sort} currentOrder={order} currentSearch={search}/>
  )
}
