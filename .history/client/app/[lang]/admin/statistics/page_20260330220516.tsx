'use client'

import { useTranslation } from "@/app/context/TranslationProvider"

export default function page() {

    const {t} = useTranslation()

    const mainData = [
        {name: t('admin', 'MainData'), value: 1200},
    ]

  return (
    <div className="flex justify-center items-center w-full">
      
    </div>
  )
}

