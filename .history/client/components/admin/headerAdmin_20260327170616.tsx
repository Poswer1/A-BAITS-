'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { usePathname } from "next/navigation"

export default function HeaderAdmin() {
    
    const {t} = useTranslation()
    const path = usePathname()

    let title = ''
    if(path.includes('users')) {
        title = {t('')}
    }

  return (
    <div className="flex justify-start items-center w-full p-5 bg-white">
      <h1></h1>
    </div>
  )
}

