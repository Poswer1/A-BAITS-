'use client'

import { useTranslation } from "@/app/context/TranslationProvider"

export default function page() {

    const {t} = useTranslation()

    const mainData = [
        {name: t('admin', 'TotalTurnover'), value: 1200},
        {nmae: t('admin', 'CountRegisteredUsers'), value: 300},
        {name: t('admin', 'Users'), value: 1200},
        {name: t('admin', 'Lots'), value: 300},
    ]

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-start items-center w-full">
        {mainData.map(data => (
            <div className="flex justify-center items-center bg-white p-2 rounded-xl">
            </div>
        ))}
      </div>
    </div>
  )
}

