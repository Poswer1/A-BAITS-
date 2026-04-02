import Lots from "@/components/admin/lots"
import { getLotsBySearch } from "@/services/admin/lots"
import { getAllLot } from "@/services/lot"
import { LotTypes } from "@/types/types"
import { cookies } from "next/headers"


export default async function page({searchParams}: {searchParams: {search:string}}) {
  const search = await searchParams
  const valueSearch = search.search as string
  let listLots: LotTypes[] = []

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) {
      console.log('токен не найден')
      return
    }
    listLots = await getLotsBySearch(token, valueSearch)
  } catch (error) {
    listLots = []
  }

  return (
    <Lots lots={listLots}/>
  )
}
