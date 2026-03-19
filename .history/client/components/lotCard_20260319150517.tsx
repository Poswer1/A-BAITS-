'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import { Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import FavoritesButton from "./ui/favoritesButton"
import { getValueByLang } from "@/utils/translateValue"

interface LotCardProps {
    lot:any
}

function LotCard({lot}: LotCardProps) {
    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL

    const city = getValueByLang()
 
    return (
        <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer flex justify-start items-center gap-10 shadow-lg text-black`}>
            <div className="flex flex-col justify-center items-center w-60 md:w-65 2xl:w-95">
                <img src={`${BASE_URL}${lot.images[0]}`} className="rounded-t-xl object-cover w-full h-55"/>
                <div className="flex flex-col justify-center items-start p-2 w-full bg-gray-100 gap-2 rounded-b-xl">
                    <h1 className="line-clamp-1">{lot.name}</h1>
                    <span className="font-bold">№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber || '11111111'}</span>
                    </span>
                    <span className="text-black">
                      {t('lot', 'lot-current-bid')}: <span className="text-xl font-bold text-orange-600">{lot.startPrice} ₴</span>
                    </span>
                    <span className="text-black">
                      {t('lot', 'lot-location')}: <span className="font-bold text-black">{lot.location}</span>
                    </span>
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <button className={`${hover} p-2 bg-orange-600 rounded-md text-white w-full md:w-auto`}>
                            {t('lot', 'lot-details-button')}
                        </button>
                        <FavoritesButton id={lot._id}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LotCard
