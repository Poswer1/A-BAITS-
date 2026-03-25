'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import Sidebar from "./sidebar"
import { LotTypes } from "@/types/types"
import LotCardV2 from "../lotCardV2"
import Pagination from "../ui/pagination"

interface LotActivityProps {
    data:{ allLots: LotTypes[], totalLot: number }
    mode:string
    slug:string
}

export default function LotActivity({data, mode, slug}: LotActivityProps) {

    const {t} = useTranslation()

    let active = ''

    if(slug === 'Active') {
      active = t('profile', 'active')
    } else if(slug === 'Archive') {
      active = t('profile', 'archived')
    } else if(slug === 'Favorite') {
      active = t('profile', 'favorites')
    } else if(slug === 'Completed') {
      active = t('profile', 'completed')
    } else if(slug === 'Sold') {
      active = t('profile', 'sold')
    }

  return (
    <div className={pageContainerClass}> 
        <h1 className="text-xl 2xl:text-2xl lg:text-xl p-2 py-4 md:p-0 md:mb-2">{mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {slug === 'active' ? t('profile', 'active') : slug === 'archive' ? t('profile', 'archived') : slug === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <Sidebar mode={mode} active={active}/>
          <div className={lotListClass}>
            <h1 className="px-2  md:p-0">{t('profile', 'LotsFound')}: {data?.totalLot}</h1>
            {data?.allLots.map((lot:any) => (
              <LotCardV2 lot={lot} show={true}/> 
            ))}
            <Pagination total={data?.totalLot || 0} maxLot={4}/>
          </div>
        </div>
    </div>
  )
}

