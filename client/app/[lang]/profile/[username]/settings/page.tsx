'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AvatarBlock from "@/components/utils/avatar"
import Loading from "@/components/utils/loadig"
import LocationList from "@/components/utils/location"
import { getUserById} from "@/services/user"
import { input } from "@/styles/createLot"
import { button,inputBlock, loadingBlock } from "@/styles/global"
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
              <h1 className="text-xl mb-5">{t('profile', 'settingsProfile')}</h1>
                <div className="flex flex-col justify-center items-center w-2/3 gap-5">
                  
                  <div className={blockClass}>
                        <div className="relative">
                          <AvatarBlock avatar={user?.avatar} size="180" changeAvatar={changeAvatar} setChangeAvatar={setChangeAvatar}/>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <h1 className="text-xl">{username}</h1>
                          <span className="text-gray-500 text-sm">{location || t('profile', 'cityNotSelected')}</span>
                        </div>
                  </div>

                  <div className={`${blockClass} flex-col !items-start !gap-0`}>
                    
                    <div className="flex justify-start items-center p-2 gap-5 w-full">
                        <div className={inputBlock}>
                          <span>{t('profile','firstName')}<span className="text-orange-600">*</span></span>
                          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={`Ваше ${t('profile','firstName')}`} className={`${input} border-gray-300 border`}/>
                        </div>

                        <div className={inputBlock}>
                          <span>{t('profile','lastName')}<span className="text-orange-600">*</span></span>
                          <input placeholder={`Ваша ${t('profile','lastName')}`} className={`${input} border-gray-300 border`}/>
                        </div>
                    </div>

                    <div className="flex justify-start items-center p-2 w-1/2">
                      <div className={`${inputBlock} relative`}>
                          <span>Город</span>
                          <div onClick={() => setOpenCity(prev => !prev)} className={`${input} ${hover} !justify-between border-gray-300 border`}>{location || t('profile', 'selectCity')} <ChevronDown className={arrowActive(openCity)}/></div>
                          {openCity && (
                              <LocationList setLocation={setLocation} setOpenSelectLocation={setOpenCity}/>
                          )}
                      </div>
                    </div>
                    
                    <button className={`${button} ${hover} ml-7 mb-5`}>{t('profile', 'saveChanges')}</button>
                </div>
              </div>
            </>
        )}
    </div>
  )
}

export default page
