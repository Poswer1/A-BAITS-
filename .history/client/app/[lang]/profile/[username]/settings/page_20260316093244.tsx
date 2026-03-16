'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AvatarBlock from "@/components/utils/avatar"
import InputField from "@/components/utils/inputFields"
import Loading from "@/components/utils/loadig"
import SelectionField from "@/components/utils/selectionField"
import { getUserById, updateUser} from "@/services/user"
import { button,buttonWithoutBg,inputBlock, loadingBlock } from "@/styles/global"
import { blockClass} from "@/styles/profile/profile"
import { animationOpacity, hover } from "@/styles/style"
import { useEffect, useState } from "react"
import LocationList from '../../../../../data/citiesUK.json'
import { useParams } from "react-router-dom"

function page() {

  const params = useParams()
  const lang = params.lang as string

  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')
  const [surname, setSurname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [defaultAvatar, setDefaultAvatar] = useState('')
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const {t} = useTranslation()

  const cityObj = LocationList.find(l => l.name === location)
  const city = lang === 'ru' ? cityObj?.ru : cityObj?.uk

  useEffect(() => {
    getUserById()
    .then(data => {
      setUsername(data.name)
      setAvatar(data.avatar)
      setLocation(data.location)
      setSurname(data.surname || '')
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

    const randomAvatar = listAvatar[Math.floor(Math.random() * listAvatar.length)]

    setAvatar(randomAvatar.avatar)
    setDefaultAvatar(randomAvatar.avatar)
  }

  const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return
    const newFile = e.target.files[0]
    setFile(newFile)
    const preview = URL.createObjectURL(newFile)
    setPreview(preview)
  }

  const handleUpdate = async () => {
    const formData = new FormData()

    if(username)formData.append('name', username)
    if(surname)formData.append('surname', surname)
    if(defaultAvatar)formData.append('defaultAvatar', defaultAvatar)
    if(location)formData.append('location', location)
    if(file)formData.append('image', file)

    try {
      await updateUser(formData)
      setMessage(t('profile', 'ProfileUpdated'))
      setTimeout(() => (
        setMessage('')
      ), 3000)
    } catch (error:unknown) {
      if (error instanceof Error) {
        setError(t('profile', error.message))
        setTimeout(() => (
          setError('')
        ), 3000)
      }
    }
  }
  

  return (
    <div className={`${blockClass} flex-col !items-start`}>
      {loading ? (
        <div className={loadingBlock}>
           <Loading />
        </div>
            ): (
              <>
                <div className="flex flex-col justify-start items-start w-4/5 gap-5">
                  
                  <div className={blockClass}>
                        <div className="relative">
                          <AvatarBlock avatar={avatar} size="120" preview={preview}/>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <h1 className="text-xl">{username}</h1>
                          <span className="text-gray-500 text-sm">{city || t('profile', 'cityNotSelected')}</span>
                          <div className="flex justify-center items-center gap-2 mt-1">
                            <label htmlFor="selectPhoto" className={`${button} !p-2`}>{t('profile', 'changeAvatar')}</label>
                            <input type="file" id="selectPhoto" onChange={handleFile} className="hidden"/>
                            <button className={`${buttonWithoutBg} !p-2`} onClick={handleDefaultAvatar}>{t('profile', 'defultAvatar')}</button>
                          </div>
                        </div>
                  </div>
                  {(message || error) && (
                    <span className={`${message ? 'text-green-600' : 'text-red-600'} ${animationOpacity}`}>{message || error}</span>
                  )}
                  <div className="flex justify-center items-center w-full gap-5">
                    <InputField value={username} onChange={setUsername} placeholder={t('profile', 'firstName')} label={t('profile', 'firstName')}/>
                    <InputField value={surname} onChange={setSurname} placeholder={t('profile', 'lastName')} label={t('profile', 'lastName')}/>
                  </div>
                  <div className="flex w-1/2">
                    <SelectionField title={t('profile', 'selectCity')} placeholder={t('profile', 'selectCity')} setValue={setLocation} list={LocationList}/>
                  </div>

                  <button onClick={handleUpdate} className={`${button} ${hover} mb-2`}>{t('profile', 'saveChanges')}</button>
              </div>
            </>
        )}
    </div>
  )
}

export default page
