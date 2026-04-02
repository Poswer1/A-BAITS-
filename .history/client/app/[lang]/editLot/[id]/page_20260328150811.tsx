import LotForm from '@/components/lot/lotForm'
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

  let initialDate:LotTypes 

  try {
    if(!id) {
      console.log('айди не найден')
      return
    }
    initialDate = await getLot(id)
  } catch (error) {
    initialDate = []
  }

  return (
    <LotForm mode='edit' initialData={initialDate}/>
  )
}

