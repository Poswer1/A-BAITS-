'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AvatarBlock from "@/components/utils/avatar"
import Loading from "@/components/utils/loadig"
import LocationList from "@/components/utils/location"
import { getUserById} from "@/services/user"
import { button,buttonWithoutBg,inputBlock, loadingBlock } from "@/styles/global"
import { blockClass} from "@/styles/profile/profile"
import { hover } from "@/styles/style"
import { useEffect, useState } from "react"

function page() {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')

  const [avatar, setAvatar] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const {t} = useTranslation()

  useEffect(() => {
    getUserById()
    .then(data => {
      setUsername(data.name)
      setAvatar(data.avatar)
      setLocation(data.location)
      setLoading(false)
    })
  }, [])

  const handleDefaultAvatar = () => {

    const listAvatar = [
      {avatar: '/uploads/defaultAvatar/avatar1.webp'},
      {avatar: '/uploads/defaultAvatar/avatar2.webp'},
      {avatar: '/uploads/defaultAvatar/avatar3.webp'}
    ]

    const randomAvatar = 

    setAvatar()
  }

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
                          <AvatarBlock avatar={avatar} size="120" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <h1 className="text-xl">{username}</h1>
                          <span className="text-gray-500 text-sm">{location || t('profile', 'cityNotSelected')}</span>
                          <div className="flex justify-center items-center gap-2 mt-1">
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
