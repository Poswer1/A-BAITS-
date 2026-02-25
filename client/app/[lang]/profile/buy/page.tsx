'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import LotCard from "@/components/lotCard"
import LotActivity from "@/components/profile/lotActivity"
import SidebarLots from "@/components/profile/sidebarLots"
import Loading from "@/components/utils/loadig"
import { getAllLot } from "@/services/lot"
import { loadingBlock } from "@/styles/global"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import { useEffect, useState } from "react"

function page() {
  const {t} = useTranslation()
  const [active, setActive] = useState('active')
  const [allLots, setAllLots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('buy')

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
