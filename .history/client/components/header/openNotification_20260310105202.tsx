import { useTranslation } from '@/app/context/TranslationProvider'
import React from 'react'

export default function OpenNotification() {

    const {t} = useTranslation()

  return (
    <div className='flex flex-col justify-start items-start'>
        <h1>{t('notification')}</h1>
    </div>
  )
}

