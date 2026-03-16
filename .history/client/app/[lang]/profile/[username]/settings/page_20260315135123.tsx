'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AvatarBlock from "@/components/utils/avatar"
import Loading from "@/components/utils/loadig"
import LocationList from "@/components/utils/location"
import { getUserById} from "@/services/user"
import { input } from "@/styles/createLot"
import { button,buttonWithoutBg,inputBlock, loadingBlock } from "@/styles/global"
import { blockClass, pageContainerClass } from "@/styles/profile/profile"
import { arrowActive, hover } from "@/styles/style"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

function page() {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [openCity, setOpenCity] = useState(false)
  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')
  const [changeAvatar, setChangeAvatar] = useState(false)

  const {t} = useTranslation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) return
    getUserById(token)
    .then(data => {
      setUser(data)
      setUsername(data.name)
      setLocation(data.location)
      setLoading(false)
    })
  }, [])

  return (
    <div className={`${blockClass} flex-col !items-start`}>
      {loading ? (
        <div className={loadingBlock}>
           <Loading />
        </div>
            ): (
              <>
              <h1 className="text-xl">{t('profile', 'settingsProfile')}</h1>
                <div className="flex flex-col justify-center items-center w-2/3 gap-5">
                  
                  <div className={blockClass}>
                        <div className="relative">
                          <AvatarBlock avatar={user?.avatar} size="120" changeAvatar={changeAvatar} setChangeAvatar={setChangeAvatar}/>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <h1 className="text-xl">{username}</h1>
                          <span className="text-gray-500 text-sm">{location || t('profile', 'cityNotSelected')}</span>
                          <div className="flex justify-center items-center gap-2 mt-2">
                            <button className={`${button} !p-2`}>{t('profile', 'changeAvatar')}</button>
                            <button className={`${buttonWithoutBg} !p-2`}>{t('profile', 'defultAvatar')}</button>
                          </div>
                        </div>
                  </div>

                  <div className={`${blockClass} flex-col !items-start !gap-0`}>
                    
                    <button className={`${button} ${hover} mb-2`}>{t('profile', 'saveChanges')}</button>
                </div>
              </div>
            </>
        )}
    </div>
  )
}

export default page
