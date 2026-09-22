'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { button, overlay} from "@/styles/global"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import listLocation from '../../data/citiesUK.json'
import FavoritesButton from "../ui/favoritesButton"
import Countdown from "../ui/countdown"
import { LotTypes } from "@/types/types"
import { getValueByLang } from "@/utils/translateValue"
import { hover } from "@/styles/style"
import type { MouseEvent } from "react"
import { getChatId } from "@/services/chat"

interface LotCardV2Props {
    lot:LotTypes
    useFrom?:string
    select?:string
    selectLot?:(v:string) => void
}

export default function LotCardV2({lot,  useFrom, select, selectLot}: LotCardV2Props) {

    const { t } = useTranslation()
    const params = useParams()
    const router = useRouter()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const opensChat = lot.status === 'Buying' || lot.status === 'Sold'

   const stateList = [
    {name: 'new', lang: t('catalog', 'state-new')},
    {name: 'used', lang: 'Б/У'},
    {name: 'needsRepairs', lang: t('catalog', 'state-needsRepairs')},
    {name: 'forSpare', lang: t('catalog', 'state-forSpare')}
  ]
    const openChat = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const chatId = await getChatId(lot.author._id, lot._id)
        router.push(`/${lang}/profile/chat/?id=${chatId}`)
    }

    const state = getValueByLang(stateList, lot.state, lang)
    const city = getValueByLang(listLocation, lot.location, lang)
    const priceLot = lot.status !== 'Active' ? lot.redemptionMethod === 'bid' ? lot.startPrice : lot.blitzPrice : lot.startPrice

    const columnClass = `flex flex-col justify-start items-start gap-1 w-full md:w-45 xl:w-55 2xl:w-70 overflow-hidden`

  return (
    <Link href={select === 'edit' ? `/${lang}/editLot/${lot.lotNumber}` : select ? '' : `/${lang}/lot/${lot.lotNumber}`} onClick={() => (select && selectLot )? selectLot(lot._id) : ''} className={`cursor-pointer border-t border-b border-gray-200 flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-10 bg-white w-full md:rounded-md text-base text-black overflow-hidden relative`}>
        <img src={`${BASE_URL}${lot.images[0]}`} className=" object-cover hidden w-40 h-40 md:block"/>
        <div className="flex justify-between items-center w-full">
            <div className={`${columnClass} hidden md:block`}>
                <h1>{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
                <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
            </div>

            <div className={`${columnClass} hidden md:flex`}>
                <span>{t('lot', 'lot-state')}: <span className="text-orange-600">{state}</span></span>
                <span>{t('lot', 'lot-location')}: {city}</span>
            </div>
            
            <div className={`${columnClass} hidden md:block text-black`}>
                    {t('lot', 'lot-dateStop')}
                    <Countdown date={lot.date.toString()} />
                   
            </div> 
            
            <div className={`${columnClass} p-2 flex-col`}>
                <h1 className="text-lg hidden md:block">{lot.status !== 'Active' ? t('lot', 'purchasePrice') : t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{priceLot} ₴</span></h1>
                <button type="button" onClick={opensChat ? openChat : undefined} className={`${button} w-full md:w-auto`}>
                    {opensChat ? t('lot', 'chat') : t('lot', 'checkDetails')}
                </button>
                <FavoritesButton id={lot._id}/>
            </div>
        </div>
    </Link>
  )
}

