'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { animationScale, hover } from "@/styles/style"
import { useEffect, useState } from "react"
import InputField from "../ui/inputFields"
import { button, loadingBlock, overlay } from "@/styles/global"
import { Templates, UserTypes } from "@/types/types"
import AvatarBlock from "../ui/avatar"
import { hoverCat } from "@/styles/categoryList"
import { Plus, Search, X } from "lucide-react"
import SearchBlock from "../ui/search"
import { getAllTemplate, getTemplateById, Newsletter, newTemplate, sendEmail } from "@/services/admin/email"
import SelectionField from "../ui/selectionField"
import Loading from "../ui/loadig"
import TitleSection from "./titleSection"
import Toast from "../ui/toast"

interface NotificationProps {
    allUser: UserTypes[]
}

export default function Notification({allUser}:NotificationProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [subject, setSubject] = useState('')
    const [html, setHtml] = useState('')
    const [openModal, setOpenModal] = useState('')
    const [openNewBlanks, setOpenNewBlanks] = useState(false)
    const [user, setUser] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [template, setTemplate] = useState('')
    const [allTemplates, setAllTemplates] = useState<Templates[]>([])
    const [loading, setLoading] = useState(false)

    const listBlanks = [
        {name: "Заготовка1"},
        {name: "Заготовка2"},
        {name: "Заготовка3"},
        {name: "Заготовка4"},
    ]

    const handleNewTemplate = async () => {
        if(!subject && !html) return
        try {
            await newTemplate(subject, html)
            setMessage(t('admin', 'newTemplateSuccessCreate'))
            setTimeout(() => {
                setMessage('')
            }, 3000)
            setSubject('')
            setHtml('')
        } catch (error:any) {
            setError(t('admin', error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
        setOpenNewBlanks(false)
    }

    const handleSendMessage = async () => {
        setLoading(true)
        try {
            if(openModal === 'Newsletter') {
                await Newsletter(subject, html)
                setLoading(false)
            } else {
                await sendEmail(user, subject, html)
                setLoading(false)
            }
            setMessage(t('admin', 'successSendMessage'))
            setTimeout(() => {
                setMessage('')
            }, 3000)
            setSearchValue('')
            setHtml('')
        } catch (error:any) {
            setLoading(false)
            setError(t('admin', error.message))
            setTimeout(() => {
                setError('')
            }, 3000)
        }
        setOpenModal('')
        setUser('')
    }

    useEffect(() => {
        if(!openModal) return
        getAllTemplate()
        .then(data => {
            setAllTemplates(data)
        })
    }, [openModal])

    useEffect(() => {
        if(!template) return
        getTemplateById(template)
        .then(data => {
            setSubject(data.subject)
            setHtml(data.html)
        })
    }, [template])

    const handleClose = () => {
        setOpenModal('')
        setOpenNewBlanks(false)
        setSubject('')
        setHtml('')
        setUser('')
        setTemplate('')
    }

    const updateList = allTemplates.map((t, i) => ({
        ...t,
        name: t._id,
        ru: `${i + 1}. Шаблон`
    }))
    
  return (
    <div className="flex flex-col gap-2 w-full">
        <TitleSection title={t('admin', 'Notifications')}/>
        <div className="flex flex-col md:flex-row items-center md:w-full gap-2">
            <button onClick={() => setOpenModal('MessageUser')} className={`${button} !bg-white shadow-sm !text-black w-[90%] md:w-auto`}>{t('admin', 'MessageUser')}</button>
            <button onClick={() => {setOpenModal('Newsletter'), setUser('Newsletter')}} className={`${button} !bg-white shadow-sm !text-black w-[90%] md:w-auto`}>{t('admin', 'Newsletter')}</button>
            <button onClick={() => setOpenNewBlanks(true)} className={`${button} gap-1 w-[90%] md:w-auto`}><Plus size={20}/> {t('admin', 'addBlanks')}</button>
        </div>
        {(openModal || openNewBlanks) && (
            <div className={overlay} onClick={handleClose}>
                <div onClick={(e) => e.stopPropagation()} className={`${animationScale} flex flex-col justify-center items-start w-[90%] md:w-1/3 p-2 bg-white rounded-2xl gap-2 min-h-60`}>
                    {loading ? (
                        <div className={loadingBlock}>
                            <Loading />
                        </div>
                    ): (
                        <> 
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-xl">{openNewBlanks ? t('admin', 'newBlanks') : !user ? t('admin', 'selectUser') : t('admin', 'sendMessage')}</h1>
                            <X className={hover} onClick={handleClose}/>
                        </div>
                        {openNewBlanks ? (
                            <>
                                <InputField label={t('admin', 'NotificationSubjectTitle')} placeholder={t('admin', 'NotificationSubjectTitle')} type="string" value={subject} onChange={setSubject}/>
                                <InputField label={t('admin', 'NotificationHtmlTitle')} placeholder={t('admin', 'NotificationHtmlTitle')} type="string" value={html} onChange={setHtml}/>
                                <button onClick={handleNewTemplate} className={`${button} w-full`}>{t('admin','addBlanks')}</button>
                            </>
                        ): (
                            <>
                            {!user ? (
                                <>
                                    <SearchBlock searchValue={searchValue} setSearchValue={setSearchValue} placeholder={t('admin', 'searchUser')}/>
                                    <div className="flex flex-col overflow-y-auto max-h-100 custom-scrollbar w-full">
                                        {allUser.map((user) => (
                                            <div onClick={() => setUser(user.email)} className={`${hoverCat} flex justify-start items-center w-full border-t border-b border-gray-200 p-1 gap-2`}>
                                                <AvatarBlock avatar={user.avatar} size="40"/>
                                                <div className="flex flex-col">
                                                    <h1>{user.name}</h1>
                                                    <span className="text-sm text-gray-500">{user.email}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ): (
                                <>  
                                    <SelectionField title={t('admin', 'Blanks')} placeholder={t('admin', 'Blanks')} value={template} setValue={setTemplate} list={updateList}/>
                                    <InputField label={t('admin', 'NotificationSubjectTitle')} placeholder={t('admin', 'NotificationSubjectTitle')} type="string" value={subject} onChange={setSubject}/>
                                    <InputField label={t('admin', 'NotificationHtmlTitle')} placeholder={t('admin', 'NotificationHtmlTitle')} type="string" value={html} onChange={setHtml}/>
                                    <button onClick={handleSendMessage} className={`${button} w-full`}>{t('admin','send')}</button>
                                </>
                            )}
                            </>
                        )}  
                        </>
                    )}
                </div>
            </div>   
        )}
        <Toast message={message} error={error}/>
    </div>
  )
}

