'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { loadingBlock } from "@/styles/global"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import LotCard from "../lotCard"
import Sidebar from "./sidebar"

interface LotActivityProps {
    data:any
    mode:string
    slug:string
}

export default function LotActivity({filterLots, mode, slug}: LotActivityProps) {

    const {t} = useTranslation()

  return (
    <div className={pageContainerClass}> 
        <h1 className="text-2xl mb-5">{mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {slug === 'active' ? t('profile', 'active') : slug === 'archive' ? t('profile', 'archived') : slug === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex justify-start items-start gap-5">
          <Sidebar mode={mode} />
          <div className={lotListClass}>
            {filterLots?.map((lot:any) => (
              <LotCard lot={lot}/>  
            ))}
          </div>
        </div>
    </div>
  )
}

