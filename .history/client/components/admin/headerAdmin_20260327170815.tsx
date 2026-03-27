'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function HeaderAdmin() {
    
    const {t} = useTranslation()
    const path = usePathname()

    const pathTitles: Record<string, string> = {
        "users": "Users",
        "Lots": "Лоты",
        "Auctions": "Аукционы",
        "Finance": "Финансы",
        "Notifications": "Уведомления",
        "Reports": "Отчёты",
        "Settings": "Настройки",
    };

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

