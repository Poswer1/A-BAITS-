'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import LotCard from "@/components/lotCard"
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

  useEffect(() => {
    getAllLot()
    .then(data => {
      setAllLots(data)
      setLoading(false)
    })
  }, [])

  const filterLots = allLots.filter(lot => lot.status === active.toLowerCase())

  return (
    <div className={pageContainerClass}>
      {loading ? (
        <div className={loadingBlock}>
          <Loading />
        </div>
      ): (
      <>
        <h1 className="text-2xl mb-5">{active === 'active' ? t('profile', 'active') : active === 'archive' ? t('profile', 'archived') : active === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex justify-start items-start gap-5">
          <SidebarLots active={active} setActive={setActive}/>
          <div className={lotListClass}>
            {filterLots.map((lot, index) => (
              <LotCard lot={lot}/>
            ))}
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default page
