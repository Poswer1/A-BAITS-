'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { button} from "@/styles/global"
import { Edit, Edit2, Star, X } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import listLocation from '../../data/citiesUK.json'
import FavoritesButton from "../ui/favoritesButton"
import Countdown from "../ui/countdown"
import { LotTypes } from "@/types/types"
import { getValueByLang } from "@/utils/translateValue"
import { hover } from "@/styles/style"
import { closeLot } from "@/services/admin/lots"

interface LotCardV2Props {
    lot:LotTypes
    show?:boolean
    useFrom?:string
}

export default function LotCardV2({lot, show, useFrom}: LotCardV2Props) {

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

    const handleCloseLot = async (id:string) => {
        if(useFrom === 'admin') {
            try {
              await closeLot(id)
              alert('успешно')
            } catch (error:any) {
                alert(error.mesasge)
            }
        }
    }

    const columnClass = `flex flex-col justify-start items-start gap-1 w-full md:w-45 xl:w-55 2xl:w-70 overflow-hidden`

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer border-t border-b border-gray-200 flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-10 bg-white w-full md:rounded-md text-base text-black overflow-hidden`}>
        <div className={`${columnClass} md:hidden px-2 mt-2 bg-white `}>
            <h1 className="font-bold text-orange-600">{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
            <span>{t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
        </div>
        
        <div className="flex justify-start items-center gap-2 md:hidden bg-gray-100">
            <img src={`${BASE_URL}${lot.images[0]}`} className="object-cover w-30 md:w-40"/>
            <div className={`${columnClass} `}>
                <h1 className="text-base">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <Countdown date={lot.date.toString()}/>
            </div>
        </div>

        <img src={`${BASE_URL}${lot.images[0]}`} className=" object-cover hidden w-40 md:block"/>
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
                {useFrom === 'admin' ? (
                    <>
                     <Link href={`/${lang}/editLot/${lot.lotNumber}`} className={`${button} w-full !bg-gray-200 !text-black`}>{t('admin', 'edit')}</Link >
                     <button onClick={() => handleCloseLot(lot._id)} className={`${button} w-full`}>{t('admin', 'close')}</button>
                    </>
                ): (
                    <>
                        <h1 className="text-lg hidden md:block">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                        <button className={`${button} w-full md:w-auto`}>{t('lot', 'lot-doBid')}</button>
                        <FavoritesButton id={lot._id}/>
                    </>
                )}
            </div>
        </div>
    </Link>
  )
}

