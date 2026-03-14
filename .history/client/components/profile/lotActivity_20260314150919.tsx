'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { loadingBlock } from "@/styles/global"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import Sidebar from "./sidebar"
import { LotTypes } from "@/types/types"
import LotCardV2 from "../lotCardV2"
import Pagination from "../utils/pagination"

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
    }

  return (
    <div className={pageContainerClass}> 
        <h1 className="text-2xl mb-5">{mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {slug === 'active' ? t('profile', 'active') : slug === 'archive' ? t('profile', 'archived') : slug === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex justify-start items-start gap-5">
          <Sidebar mode={mode} active={slug}/>
          <div className={lotListClass}>
            <h1>{t('profile', 'LotsFound')}: {data?.totalLot}</h1>
            {data?.allLots.map((lot:any) => (
              <LotCardV2 lot={lot} show={true}/> 
            ))}
            <Pagination total={data?.totalLot || 0} maxLot={4}/>
          </div>
        </div>
    </div>
  )
}

