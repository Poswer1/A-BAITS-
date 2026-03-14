import { LotTypes } from '@/types/types'
import React from 'react'

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
    
    let date:{allLots: LotTypes[], totalLots: number} = {
      allReview:[], 
      totalReview: 0
    }

  return (
    <div className='flex gap-2 flex-col w-full'>
      <h1>Найдено: 3</h1>
    </div>
  )
}

export default page
