'use client'

import LotActivity from '@/components/profile/lotActivity'
import { getAllLot } from '@/services/lot'
import { useEffect, useState } from 'react'

function page() {

    const [active, setActive] = useState('active')
    const [allLots, setAllLots] = useState<any[]>([])
    const [loading, setLoading] = useState(false) 
    const [mode, setMode] = useState('sell')

   useEffect(() => {
       getAllLot()
       .then(data => {
         setAllLots(data)
         setLoading(false)
       })
     }, []) 

      const filterLots = allLots.filter(lot => lot.status === active.toLowerCase())

  return (
    <LotActivity loading={loading} active={active} setActive={setActive} filterLots={filterLots} mode={mode}/>
  )
}

export default page
