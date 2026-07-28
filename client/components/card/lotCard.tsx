'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import Link from "next/link"
import { useParams } from "next/navigation"
import FavoritesButton from "../ui/favoritesButton"
import { getValueByLang } from "@/utils/translateValue"
import ListLocation from '../../data/citiesUK.json'

interface LotCardProps {
    lot:any
    openFrom?:string
    select?:string
    selectLot?:(v:string) => void
}

function LotCard({lot, openFrom, select, selectLot}: LotCardProps) {
    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL

    const city = getValueByLang(ListLocation, lot.location, lang)
 
    return (
        <Link 
            href={select === 'edit' ? `/${lang}/editLot/${lot.lotNumber}` : select ? '' : `/${lang}/lot/${lot.lotNumber}`} 
            onClick={() => (select && selectLot) ? selectLot(lot._id) : ''}
            className={`cursor-pointer flex justify-start items-center gap-10 shadow-lg text-black rounded-b-xl ${openFrom === 'catalog' ? 'w-full' : "w-[200px]"} md:w-1/4 `}
            >
            <div className="flex flex-col justify-center items-center w-full md:w-full">
                    <div className={`${openFrom === 'catalog' ? "w-full" : 'md:w-full w-[180px]'} h-55 flex items-center justify-center overflow-hidden`}>
                        <img
                            src={`${BASE_URL}${lot.images[0]}`}
                            alt={lot.name}
                            className="w-full h-full object-cover"
                        />
                        </div>
                <div className="flex flex-col justify-center items-start p-2 w-full bg-gray-100 gap-2 rounded-b-xl">
                    <h1 className="line-clamp-1">{lot.name}</h1>
                    
                    <span className="text-black text-sm md:text-base">
                      {t('lot', 'lot-current-bid')}: <span className="text-xl font-bold text-orange-600">{lot.startPrice} ₴</span>
                    </span>
                    <span className="text-black text-sm md:text-base">
                      {t('lot', 'lot-location')}: <span className="font-bold text-black"><br/>{city || lot.location}</span>
                    </span>
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <button className={`${hover} p-2 bg-orange-600 rounded-md text-white w-full md:w-auto text-sm md:text-base`}>
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
