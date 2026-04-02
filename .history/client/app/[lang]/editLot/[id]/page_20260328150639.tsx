import LotForm from '@/components/lot/lotForm'
import { getLot } from '@/services/lot'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    id:string
  }
}

export default async function page({params} : pageProps) {

  let initialDate:LotTypes[] = []

  try {
    initialDate = await getLot()
  } catch (error) {
    
  }

  return (
    <LotForm mode='edit'/>
  )
}

