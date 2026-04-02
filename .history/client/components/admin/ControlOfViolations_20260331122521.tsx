'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'

interface ControlOfViolationsProps {
    allViolations:ViolationsTypes[]
}

export default function ControlOfViolations({allViolations}: ControlOfViolationsProps) {
  
    const {t} = useTranslation()
  
    return (
    <div className='flex flex-col justify-start items-start gap-4 w-full'>
        <h1 className='text-xl'>{t('admin', 'ControlOfViolations')}</h1>
        <div className='flex flex-col justify-start items-start w-full'>
            {allViolations.map((v) => (
                <div className='flex justify-between items-center w-full bg-white border-t border-b border-'>
                </div>
            ))}
        </div>
    </div>
  )
}

