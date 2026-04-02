'use client'

import { useTranslation } from "@/app/context/TranslationProvider"

export default function page() {

    const {t} = useTranslation()

    const mainData = [
        name
        {name: t('admin', 'Users'), value: 1200},
        {name: t('admin', 'Lots'), value: 300},
    ]

  return (
    <div className="flex justify-center items-center w-full">
      
    </div>
  )
}

