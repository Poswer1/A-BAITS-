'use client'

import LotActivity from '@/components/profile/lotActivity'
import { getAllLot } from '@/services/lot'
import { useEffect, useState } from 'react'

function page() {


      

  return (
    <LotActivity  active={active} setActive={setActive} filterLots={filterLots} mode={mode}/>
  )
}

export default page
