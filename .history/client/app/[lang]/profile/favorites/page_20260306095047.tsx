'use client'

import { useTranslation } from "@/app/context/TranslationProvider";
import LotCard from "@/components/lotCard";
import { getAllLot } from "@/services/lot";
import { lotListClass, pageContainerClass } from "@/styles/profile/profile";
import { useEffect, useState } from "react";

export default function page() {

    const {t} = useTranslation()
    const [loading, setLoading] = useState(true)
    const [allLots, setAllLots] = useState<any[]>([])

    useEffect(() => {
        getAllLot()
        .then(data => {
            setAllLots(data)
            setLoading(false)
        })
    }, [])

  return (
    <div className={`${pageContainerClass} gap-5`}>
        <h1 className="text-2xl">{t('profile', 'favorites')}</h1>
        <div className={lotListClass}>
            {allLots.map((lot) => (
                <LotCard lot={lot}/>
            ))}
        </div>
    </div>
  )
}

