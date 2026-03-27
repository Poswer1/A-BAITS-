'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function HeaderAdmin() {
    
    const {t} = useTranslation()
    const path = usePathname()

    let title = ''
    useEffect(() => {
        if(path.includes('users')) {
        title = t('admin', 'Users')
    } else if(path.includes('Lots')) {

    }
    }, [path])

  return (
    <div className="flex justify-start items-center w-full p-5 bg-white">
      <h1></h1>
    </div>
  )
}

