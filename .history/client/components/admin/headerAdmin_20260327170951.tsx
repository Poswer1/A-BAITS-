'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function HeaderAdmin() {
    
    const {t} = useTranslation()
    const path = usePathname()
    const [title, setTitle] = useState('')
    
     useEffect(() => {
    if (path.includes('users')) {
      setTitle(t('admin', 'Users'))
    } else if (path.includes('Lots')) {
      setTitle(t('admin', 'Lots'))
    } else if (path.includes('Auctions')) {
      setTitle(t('admin', 'Auctions'))
    } else if (path.includes('Finance')) {
      setTitle(t('admin', 'Finance'))
    } else if (path.includes('Notifications')) {
      setTitle(t('admin', 'Notifications'))
    } else if (path.includes('Reports')) {
      setTitle(t('admin', 'Reports'))
    } else if (path.includes('Settings')) {
      setTitle(t('admin', 'Settings'))
    } else {
      setTitle('') // по умолчанию
    }
  }, [path, t])

  return (
    <div className="flex justify-start items-center w-full p-5 bg-white">
      <h1></h1>
    </div>
  )
}

