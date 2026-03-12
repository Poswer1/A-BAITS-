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

  return (
    <Link href={`/${lang}/lot/${lot.lotNumber}`} className={`cursor-pointer flex justify-start items-center gap-10 shadow-lg bg-white w-full`}>
        <img src={`${BASE_URL}${lot.images[0]}`} className="rounded-l-xl object-cover w-35"/>
    </Link>
  )
}

