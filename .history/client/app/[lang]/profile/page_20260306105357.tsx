'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { getUserById} from "@/services/user"
import { pageContainerClass } from "@/styles/profile/profile"
import { useEffect, useState } from "react"


function page() {
  const [user, setUser] = useState<any | null>(null)
  const [active, setActive] = useState('')

  const {t} = useTranslation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) return
    getUserById(token)
    .then(data => {
      setUser(data)
    })
  }, [])

  return (
    <div className={pageContainerClass}>
      <h1 className="text-2xl">{t('profile', 'profile')} | {user?.name}</h1>
      <div className="flex justify-start items-start w-full gap-5 mt-2">
      </div>
    </div>
  )
}

export default page
