'use client'

import LotCard from '../card/lotCard'
import { LotTypes } from '@/types/types'
import { useTranslation } from '@/app/context/TranslationProvider'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { hover } from '@/styles/style'
import Link from 'next/link'

interface LotsProps {
    allLot:LotTypes[],
    mode:string
}

export default function Lots({allLot, mode}: LotsProps) {

    const {t} = useTranslation()

    const title1 = mode === 'topLot' ? 
    'Топ' : mode === '1hryvnia' ? 
    t('main', 'Lots') : mode === 'newLots' ? 
    t('main', 'new') : t('main', 'popular')

    const title2 = mode === '1hryvnia' ? 
    t('main', 'from1hryvnia') : t('main', 'lots')


    if(allLot.length === 0) return null

  return (
    <div className="flex flex-col justify-start items-start md:items-start w-[90%]">
        <h1 className="text-3xl font-bold text-black mb-5"><span className="text-orange-600">{title1} </span>{title2}</h1>
        <div className="flex justify-start items-center w-full overflow-x-auto gap-5 lg:gap-10 ">
            {allLot.slice(0, 4).map((lot) => (
              <LotCard key={lot._id} lot={lot}/>
            ))}
            {/* <Link href={''} className={`${hover} p-2 bg-orange-600 text-white rounded-full`}><ArrowRight /></Link> */}
        </div>
    </div>
  )
}
