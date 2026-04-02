import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'
import React from 'react'

interface ControlOfViolationsProps {
    allViolations:ViolationsTypes[]
}

export default function ControlOfViolations({allViolations}: ControlOfViolationsProps) {
  
    const {t} = useTranslation()
  
    return (
    <div className='flex flex-col justify-start items-start gap-4 w-full'>
        <h1 className='text-xl'>{t('admin', '')}</h1>
    </div>
  )
}

