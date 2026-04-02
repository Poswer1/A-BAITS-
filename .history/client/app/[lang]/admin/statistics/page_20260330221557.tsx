'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { getLotsCount } from "@/services/admin/lots"
import { useEffect, useState } from "react"

export default function page() {

    const {t} = useTranslation()

    const [countLots, setCountLots] = useState(0)

    useEffect(() => {
        getLotsCount()
        .then(data => {
            setCountLots(data.count)
        })
    }, [])

    const mainData = [
        {name: t('admin', 'TotalTurnover'), value: 1200},
        {name: t('admin', 'CountRegisteredUsers'), value: 300},
        {name: t('admin', 'Users'), value: 1200},
        {name: t('admin', 'Lots'), value: 300},
    ]


  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-start items-center w-full gap-5">
        {mainData.map(data => (
            <div className="flex flex-col justify-center items-start bg-white p-2 rounded-xl w-50">
                <h1 className="text-md">{data.name}</h1>
                <span>{data.value}</span>
            </div>
        ))}
      </div>
    </div>
  )
}

