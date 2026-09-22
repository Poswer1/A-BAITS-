import LotCardV2 from '@/components/card/lotCardV2'
import Pagination from '@/components/ui/pagination'
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
    const page = search.page as number
  
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
    <div className='flex  flex-col w-full'>
      <h1 className='px-2 mb-4 md:p-0'>Найдено: {data?.totalLots}</h1>
      {data?.allLots.map((lot) => (
        <LotCardV2 key={lot._id} lot={lot}/>
      ))}
      <Pagination total={data.totalLots} maxLot={10}/>
    </div>
  )
}

export default page
