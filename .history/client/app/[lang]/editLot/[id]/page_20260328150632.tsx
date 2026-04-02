import LotForm from '@/components/lot/lotForm'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    id:string
  }
}

export default async function page({params} : pageProps) {

  let initialDate:LotTypes[] = []

  try {
    initialDate = await getLotB
  } catch (error) {
    
  }

  return (
    <LotForm mode='edit'/>
  )
}

