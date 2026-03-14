import LotActivity from '@/components/profile/lotActivity'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    slug:string
    lang:string
  }
}

async function page({params}: pageProps) {

  const param = await params

  const slug = param.slug as string
  
  let filterLots: LotTypes[] = []  
  
  try {
    filterLots = 
  } catch (error) {
    return []
  }
  
  return (
    <LotActivity  filterLots={filterLots} mode={'sell'} slug={slug}/>
  )
}

export default page
