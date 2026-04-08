'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { overlay } from '@/styles/global'
import { animationScale, hover } from '@/styles/style'
import { AlertCircle } from 'lucide-react'
import React from 'react'

interface ModalConfirmProps {
    handleClose: () => void,
    handleAction: () => void
    title:string
    alert:string,
    yesButton:string
}

export default function ModalConfirm({handleAction, handleClose, title, alert, yesButton}:ModalConfirmProps) {
  
    const {t} = useTranslation()

    return (
    <div className={overlay}>
        <div className={`${animationScale} flex flex-col justify-center items-center  bg-white w-[90%] lg:w-2/4 xl:w-1/3 rounded-xl`}>
            <div className={`py-15 flex flex-col justify-center items-center w-[90%] gap-1`}>
                <h1 className="text-2xl text-center">{title}</h1>
                <p className="flex text-center text-gray-500 gap-1"><AlertCircle size={20} className="text-red-500"/>{alert}</p>
            </div> 
            <div className="flex w-full border-t border-gray-300">
                <button onClick={handleClose} className={`${hover} bg-gray-200 w-full rounded-bl-xl p-2`}>{t('profile', 'noIdontWant')}</button>
                <button onClick={handleAction} className={`${hover} bg-red-500 text-white w-full rounded-br-xl border-l p-2`}>{yesButton}</button>
            </div>
        </div>
    </div>
  )
}
