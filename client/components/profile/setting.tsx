'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AvatarBlock from "@/components/ui/avatar"
import InputField from "@/components/ui/inputFields"
import SelectionField from "@/components/ui/selectionField"
import { getUserById, updateUser} from "@/services/user"
import { button,buttonWithoutBg, overlay} from "@/styles/global"
import { blockClass } from "@/styles/profile/profile"
import { animationOpacity, animationScale, hover } from "@/styles/style"
import { useEffect, useState } from "react"
import LocationList from '../../data/citiesUK.json'
import { useParams } from "react-router-dom"
import { getValueByLang } from "@/utils/translateValue"
import Toast from "../ui/toast"
import { sendCode } from "@/services/admin/email"

interface SettingProps {
    id?:string
    mode:string
}

export default function Setting({id, mode}: SettingProps) {

  const params = useParams()
  const lang = params.lang as string

  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [emailFromServer, setEmailFromServer] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [defaultAvatar, setDefaultAvatar] = useState('')
  const [preview, setPreview] = useState('')
  const [confirmCode, setConfirmCode] = useState(false)
  const [code, setCode] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const {t} = useTranslation()

  useEffect(() => {
    getUserById(id)
    .then(data => {
      setUsername(data.name)
      setAvatar(data.avatar)
      setLocation(data.location)
      setLocation(data.location)
      setEmail(data.email)
      setEmailFromServer(data.email)
    })
  }, [id])

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
    if (newFile.type === 'image/webp') {
        setError(t('profile', 'formatFile'))
        setTimeout(() => {
            setError('')
        }, 3000)
        return
    }
    setFile(newFile)
    const preview = URL.createObjectURL(newFile)
    setPreview(preview)
  }

  const handleUpdate = async () => {
    const formData = new FormData()

    if(username)formData.append('name', username)
    if(defaultAvatar)formData.append('defaultAvatar', defaultAvatar)
    if(location)formData.append('location', location)
    if(email)formData.append('email', email)
    if(password)formData.append('password', password)
    if(code)formData.append('code', code)
    if(file)formData.append('image', file)

    try {
      await updateUser(formData, id)
      setConfirmCode(false)
      setCode('')
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

  const handleSendCode = async () => {
    setConfirmCode(true)
    try {
      await sendCode(emailFromServer, 'resetPassword')
      setMessage(`${t('auth', 'codeSendSuccess')} ${emailFromServer}`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error:any) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }
  
  const titleModal =
  (email !== emailFromServer && !password)
    ? t('auth', 'changeEmail')
    : (password && email === emailFromServer)
    ? t('auth', 'changePassword')
    : (email !== emailFromServer && password) &&
     t('auth', 'changePasswordAndEmail')

  return (
    <div className={`${blockClass} flex-col !items-start mb-20 md:mb-0`}>
      <>
        <div className="flex flex-col justify-start items-start w-full 2xl:w-4/5 gap-5">  
          <div className={blockClass}>
             <div className="relative ">
                <AvatarBlock avatar={avatar} size="120" preview={preview}/>
              </div>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl hidden md:block">{username}</h1>
                  <div className="flex flex-col md:flex-row justify-center text-center items-start gap-2 mt-1">
                    <label htmlFor="selectPhoto" className={`${button} !p-2 text-sm md:text-base w-full md:w-auto`}>{t('profile', 'changeAvatar')}</label>
                    <input type="file" id="selectPhoto" onChange={handleFile} className="hidden"/>
                    <button className={`${buttonWithoutBg} !p-2 text-sm md:text-base w-full md:w-auto`} onClick={handleDefaultAvatar}>{t('profile', 'defultAvatar')}</button>
                  </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap justify-start items-center w-full gap-5">
              <div className="w-full md:w-[48%]">
                <InputField 
                value={username}
                type="text" 
                onChange={setUsername} 
                placeholder={t('profile', 'firstName')} 
                label={t('profile', 'firstName')}
                />
              </div>
              <div className="w-full md:w-[48%]">
               <SelectionField 
                title={t('profile', 'selectCity')}
                placeholder={t('profile', 'selectCity')} 
                setValue={setLocation} 
                value={location} 
                list={LocationList}/>
              </div>
              <div className="w-full md:w-[48%]">
                <InputField 
                value={email}
                type="text" 
                onChange={setEmail} 
                placeholder={'Email'} 
                label={'Email'}
                />
              </div>
              <div className="w-full md:w-[48%]">
                <InputField 
                value={password}
                type="password" 
                onChange={setPassword} 
                placeholder={t('profile', 'newPassword')} 
                label={t('profile', 'newPassword')}
                />
              </div>
                    
            </div>
            <button onClick={() => (email !== emailFromServer || password) && mode === 'user' ? handleSendCode(): handleUpdate()} className={`${button} ${hover} mb-2 w-full md:w-auto`}>{t('profile', 'saveChanges')}</button>
        </div>
      </>
      {confirmCode && (
        <div className={overlay} onClick={() => setConfirmCode(false)}>
          <div onClick={(e) => e.stopPropagation()} className={`${animationScale} flex flex-col justify-center items-center p-10 bg-white rounded-xl w-[90%] lg:w-2/4 xl:w-1/3 gap-2`}>
            <h1 className="text-2xl md:text-3xl text-center">{titleModal}</h1>
            <p className="text-gray-500 text-center text-sm md:text-base">На {emailFromServer} {t('profile','sendCodeYoutEmail')}</p>
            <InputField label='' type="text" placeholder="Код" value={code} onChange={setCode}/>
            <button onClick={handleUpdate} className={`${button} w-full`}>{t('profile', 'confirm')}</button>
          </div>
        </div>
      )}
      <Toast message={message} error={error}/>
    </div>
  )
}

