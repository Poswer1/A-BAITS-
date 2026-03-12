'use client'
import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import { Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface LotCardV2Props {
    lot:any
}

export default function LotCardV2({lot}: LotCardV2Props) {

    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string
    const BASE_URL = process.env.NEXT_PUBLIC_URL

    const columnClass = ''

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer flex justify-start items-center gap-10 shadow-lg bg-white w-full`}>
        <img src={`${BASE_URL}${lot.images[0]}`} className="rounded-l-xl object-cover w-40"/>
        <div className="flex justify-between items-start w-full">
            <div className="flex flex-col justify-start items-start">
                <h1>{lot.name}</h1>
                <span>№ {t('lot', 'lot-number')} <span className="text-orange-600">{lot.lotNumber}</span></span>
            </div>
        </div>
    </Link>
  )
}

