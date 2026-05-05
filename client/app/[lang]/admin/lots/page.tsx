import Lots from "@/components/admin/lots"
import { getLotsBySearch } from "@/services/admin/lots"
import { LotTypes } from "@/types/types"
import { cookies } from "next/headers"

export default async function page({searchParams}: {searchParams: {search?:string, page?:string, sort?:string, order?:string, status?:string}}) {
  const params = await searchParams
  const search = params.search ? decodeURIComponent(params.search).trim().toLowerCase() : ''
  const page = Number(params.page) || 1
  const sort = params.sort || 'createdAt'
  const order = params.order || 'desc'
  const status = params.status || ''

  let listLots: LotTypes[] = []
  let total = 0

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    const data = await getLotsBySearch(token, search, page, sort, order, status)
    listLots = data.lots || []
    total = data.total || 0
  } catch (error) {
    listLots = []
  }

  return (
    <Lots lots={listLots} total={total} currentPage={page} currentSort={sort} currentOrder={order} currentStatus={status}/>
  )
}
