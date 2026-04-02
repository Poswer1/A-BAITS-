import LotForm from '@/components/lot/lotForm'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    id:string
  }
}

function page({params} : pageProps) {

  const initialDate:LotTypes = []

  return (
    <LotForm mode='edit'/>
  )
}

export default page
