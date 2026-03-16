import LotActivity from '@/components/profile/lotActivity'
import { getMyLots } from '@/services/lot'
import { LotTypes } from '@/types/types'
import { cookies } from 'next/headers';

interface pageProps {
  params: {
    slug:string
    lang:string
  }
  searchParams: {
    page?:number
  }
}

async function page({params, searchParams}: pageProps) {

  const param = await params
  const search = await searchParams

  const slug = param.slug as string
  
  let data: { allLots: LotTypes[], totalLot: number } = {
  allLots: [],
  totalLot: 0
}
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    data = await getMyLots(slug, 'sell', search.page)
  } catch (error) {
    data = {allLots: [],totalLot: 0}}
  
  return (
    <LotActivity data={data} mode={'sell'} slug={slug}/>
  )
}

export default page
