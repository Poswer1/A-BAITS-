import LotActivity from '@/components/profile/lotActivity'
import { getMyLots } from '@/services/lot'
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
  
  let data: {allLots:LotTypes[], totalLot:number}
  
  try {
    filterLots = await getMyLots(slug, 'sell')
  } catch (error) {
    filterLots = []
  }
  
  return (
    <LotActivity  filterLots={filterLots} mode={'sell'} slug={slug}/>
  )
}

export default page
