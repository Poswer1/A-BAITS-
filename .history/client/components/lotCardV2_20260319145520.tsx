'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { button} from "@/styles/global"
import { Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import listLocation from '../data/citiesUK.json'
import FavoritesButton from "./ui/favoritesButton"
import Countdown from "./ui/countdown"
import { LotTypes } from "@/types/types"
import { getValueByLang } from "@/utils/translateValue"

interface LotCardV2Props {
    lot:LotTypes
    show?:boolean
}

export default function LotCardV2({lot, show}: LotCardV2Props) {

    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL

   const stateList = [
    {name: 'new', lang: t('catalog', 'state-new')},
    {name: 'used', lang: 'Б/У'},
    {name: 'needsRepairs', lang: t('catalog', 'state-needsRepairs')},
    {name: 'forSpare', lang: t('catalog', 'state-forSpare')}
  ]

    
    const state = getValueByLang(stateList, lot.state, lang)
    const city = getValueByLang(listLocation, lot.location, lang)

    const columnClass = `flex flex-col justify-start items-start gap-1 w-full`

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-10 shadow-lg bg-white w-full rounded-md text-base text-black`}>
        <div className={`${columnClass} md:hidden px-2 mt-2 bg-white s`}>
            <h1 className="font-bold text-orange-600">{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
            <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
        </div>
        
        <div className="flex justify-start items-start gap-2 md:hidden bg-gray-100">
            <img src={`${BASE_URL}${lot.images[0]}`} className="md:rounded-l-md object-cover w-30 md:w-40"/>
            <div className={`${columnClass}`}>
                <h1 className="text-base">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <Countdown date={lot.date.toString()}/>
            </div>
        </div>

        <img src={`${BASE_URL}${lot.images[0]}`} className="md:rounded-l-md object-cover hidden w-40 md:block"/>
        <div className="flex justify-between items-center w-full">
            <div className={`${columnClass} hidden md:block`}>
                <h1>{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
                <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
            </div>

            <div className={`${columnClass} hidden md:block md:flex`}>
                <span>{t('lot', 'lot-state')}: <span className="text-orange-600">{state}</span></span>
                <span>{t('lot', 'lot-location')}: {city}</span>
            </div>
            
            <div className={`${columnClass} hidden md:block`}>
                <Countdown date={lot.date.toString()}/>
            </div> 
            
            <div className={`${columnClass} p-2 flex-col`}>
                <h1 className="text-lg hidden md:block">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <button className={`${button} w-full md:w-auto`}>{t('lot', 'lot-doBid')}</button>
                <FavoritesButton id={lot._id}/>
            </div>
        </div>
    </Link>
  )
}

