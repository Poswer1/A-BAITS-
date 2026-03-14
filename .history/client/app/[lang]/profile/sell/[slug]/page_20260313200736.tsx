'use client'

import LotActivity from '@/components/profile/lotActivity'
import { getAllLot } from '@/services/lot'
import { LotTypes } from '@/types/types'
import { useEffect, useState } from 'react'

interface pageProps {
  params: {
    slug:st
  }
}

function page() {


  let filterLots: LotTypes[] = []    
  
  return (
    <LotActivity  filterLots={filterLots} mode={'sell'}/>
  )
}

export default page
