import LotForm from '@/components/lot/lotForm'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    id:string
  }
}

function page({params} : pageProps) {

  let initialDate:LotTypes[] = []

  try {
    init
  } catch (error) {
    
  }

  return (
    <LotForm mode='edit'/>
  )
}

export default page
