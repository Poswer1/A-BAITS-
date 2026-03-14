import LotCardV2 from '@/components/lotCardV2'
import { getLotByUser } from '@/services/lot'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    lang:string,
    username:string
  },
  searchParams: {
    page?:number
  }
}

async function page({params, searchParams}: pageProps) {

    const param = await params
    const search = await searchParams
  
    const lang = param.lang as string
    const name = decodeURIComponent(param.username as string)
    
    let data:{allLots: LotTypes[], totalLots: number} = {
      allLots:[], 
      totalLots: 0
    }

    try {
      data = await getLotByUser(name, Number(search.page))
    } catch (error) {
      data = {allLots:[], totalLots: 0}
    }

  return (
    <div className='flex gap-2 flex-col w-full'>
      <h1>Найдено: {data?.totalLots}</h1>
      {data?.allLots.map((lot) => (
        <LotCardV2 key={}/>
      ))}
    </div>
  )
}

export default page
