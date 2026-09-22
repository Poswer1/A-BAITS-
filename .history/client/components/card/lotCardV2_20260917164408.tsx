'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { button } from "@/styles/global"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import listLocation from '../../data/citiesUK.json'
import FavoritesButton from "../ui/favoritesButton"
import Countdown from "../ui/countdown"
import { LotTypes } from "@/types/types"
import { getValueByLang } from "@/utils/translateValue"
import { useEffect, useState, type MouseEvent } from "react"
import { getUserById } from "@/services/user"
import { getChatId } from "@/services/chat"

interface LotCardV2Props {
    lot:LotTypes
    useFrom?:string
    select?:string
    selectLot?:(v:string) => void
}

export default function LotCardV2({lot, select, selectLot}: LotCardV2Props) {

    const { t } = useTranslation()
    const params = useParams()
    const router = useRouter()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [myId, setMyId] = useState('')
    const opensChat = lot.status === 'Buying' || lot.status === 'Sold'
    const authorId = typeof lot.author === 'string' ? lot.author : lot.author._id
    const isOwner = authorId === myId

    useEffect(() => {
        getUserById().then((data) => setMyId(data._id))
    }, [])

   const stateList = [
    {name: 'new', lang: t('catalog', 'state-new')},
    {name: 'used', lang: 'Б/У'},
    {name: 'needsRepairs', lang: t('catalog', 'state-needsRepairs')},
    {name: 'forSpare', lang: t('catalog', 'state-forSpare')}
  ]
    const openChat = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const chatId = await getChatId(authorId, lot._id)
        router.push(`/${lang}/profile/chat/?id=${chatId}`)
    }

    const state = getValueByLang(stateList, lot.state, lang)
    const city = getValueByLang(listLocation, lot.location, lang)
    const priceLot = lot.status !== 'Active' ? lot.redemptionMethod === 'bid' ? lot.startPrice : lot.blitzPrice : lot.startPrice

    const columnClass = `flex flex-col justify-start items-start gap-1 w-1/4 overflow-hidden`

  return (
    <Link href={select === 'edit' ? `/${lang}/editLot/${lot.lotNumber}` : select ? '' : `/${lang}/lot/${lot.lotNumber}`} onClick={() => (select && selectLot )? selectLot(lot._id) : ''} className={`cursor-pointer border-t border-b border-gray-200 flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-10 bg-white w-full md:rounded-md text-base text-black overflow-hidden relative`}>
        <img src={`${BASE_URL}${lot.images[0]}`} className=" object-cover hidden w-40 h-40 md:block"/>
        <div className="flex justify-between items-center w-full">
            <div className={`${columnClass} hidden md:block`}>
                <h1>{`${lot.name.length >=30 ? lot.name.slice(0, 30) + '...' : lot.name}`}</h1>
                <h1 className="text-sm hidden md:block">{lot.status !== 'Active' ? t('lot', 'purchasePrice') : t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold text-base">{priceLot} ₴</span></h1>
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
                <div className="xl:w-full 2xl:w-1/3 flex flex-col justify-center items-start gap-2">
                    <button type="button" onClick={opensChat ? openChat : undefined} className={`${button} w-full `}>
                        {opensChat ? t('lot', 'chat') : lot.status === 'Active' && !isOwner ? t('lot', 'lot-doBid') : t('lot', 'checkDetails')}
                    </button>
                    <FavoritesButton id={lot._id}/>
                </div>
            </div>
        </div>
    </Link>
  )
}

