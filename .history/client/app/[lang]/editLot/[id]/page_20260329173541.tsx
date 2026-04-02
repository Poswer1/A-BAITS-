import LotForm from '@/components/createLot/lotForm'
import { getLot } from '@/services/lot'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    id:string
  }
}

export default async function page({params} : pageProps) {

  const param = await params
  const id = param.id as string

    if(!id) {
      console.log('айди не найден')
      return
    }

    const roleUser = await get

    const initialDate = await getLot(id)
  

  return (
    <LotForm mode='edit' initialData={initialDate}/>
  )
}

