'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { button} from "@/styles/global"
import { Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import listLocation from '../data/citiesUK.json'

interface LotCardV2Props {
    lot:any
}

export default function LotCardV2({lot}: LotCardV2Props) {

    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL

    const cityObj = listLocation.find(c => c.name === lot.location)

    const city = cityObj 
    ? lang === 'ru'
    ? cityObj?.ru || cityObj?.name
    : cityObj?.uk || cityObj?.name
    :

    const columnClass = 'flex flex-col justify-start items-start gap-1 max-w-100'

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer flex justify-start items-center gap-10 shadow-lg bg-white w-full rounded-md`}>
        <img src={`${BASE_URL}${lot.images[0]}`} className="rounded-l-md object-cover w-40"/>
        <div className="flex justify-between items-center w-full">
            <div className={columnClass}>
                <h1>{`${lot.name}`}</h1>
                <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
            </div>
            <div className={columnClass}>
                <span>{t('lot', 'lot-state')}: <span className="text-orange-600">{lot.state}</span></span>
                <span>{t('lot', 'lot-location')}: {city}</span>
            </div>
            <div className={columnClass}>
                <span>{t('lot', 'lot-dateStop')} - <span className="text-orange-600">12д 10ч 32м 02с</span></span>
            </div>
            <div className={columnClass}>
                <h1 className="text-lg">{t('lot', 'lot-current-bid')}: <span className="text-orange-600 font-bold">{lot.startPrice} ₴</span></h1>
                <button className={button}>{t('lot', 'lot-doBid')}</button>
                <span className="flex justify-center items-center gap-2 text-orange-600"><Star /> {t('lot', 'lot-favorite')}</span>
            </div>
        </div>
    </Link>
  )
}

