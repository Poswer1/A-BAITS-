'use client'

import LotActivity from '@/components/profile/lotActivity'
import { LotTypes } from '@/types/types'

interface pageProps {
  params: {
    slug:string
    lang:string
  }
}

function page({params}: pageProps) {

  const slug = params.slug as string
  
  let filterLots: LotTypes[] = []    
  
  return (
    <LotActivity  filterLots={filterLots} mode={'sell'} slug={slug}/>
  )
}

export default page
