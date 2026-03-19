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

    const cityObj = listLocation.find(c => c.name === lot.location)
    const stateObg = stateList.find(s => s.name === lot.state)
    
    const city = cityObj 
    ? lang === 'ru'
    ? cityObj?.ru || cityObj?.name
    : cityObj?.uk || cityObj?.name
    : lot.location

    const columnClass = `flex flex-col justify-start items-start gap-1 w-full`

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer  flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-10 shadow-lg bg-white w-full rounded-md text-base`}>
        <div className={`${columnClass} md:hidden px-2 mt-2`}>
            <h1 className="font-bold text-orange-600">{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
            <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
        </div>
        <div className="flex justify-start items-start gap-2">
            <img src={`${BASE_URL}${lot.images[0]}`} className="md:rounded-l-md object-cover w-30 md:w-40"/>
            <div className={`${columnClass}`}>
                <h1 className="text-base">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <Countdown date={lot.date.toString()}/>
            </div>
        </div>
        <div className="flex justify-between items-center w-full">
            <div className={`${columnClass} `}>
                <h1>{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
                <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
            </div>
            <div className={`${columnClass}`}>
                <span>{t('lot', 'lot-state')}: <span className="text-orange-600">{stateObg?.lang}</span></span>
                <span>{t('lot', 'lot-location')}: {city}</span>
            </div>
            
            <div className={columnClass}>
                <Countdown date={lot.date.toString()}/>
            </div> 
            
            <div className={columnClass}>
                <h1 className="text-lg">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <button className={button}>{t('lot', 'lot-doBid')}</button>
                <FavoritesButton id={lot._id}/>
            </div>
        </div>
    </Link>
  )
}

