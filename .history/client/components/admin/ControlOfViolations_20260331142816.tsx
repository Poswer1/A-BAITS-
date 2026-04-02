'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'
import AvatarBlock from '../ui/avatar'

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
                <div key={v._id} className='flex justify-between items-center w-full bg-white border-t border-b border-gray-200 p-2 h-20'>
                    <div className='flex justify-start items-center gap-2'>
                        <AvatarBlock avatar={v.user.avatar} size='45'/>
                        <div className='flex flex-col justify-center'>
                            <h1>{v.user.name}</h1>
                            <span className='text-sm'>Ip - <span className='text-orange-600'>{v.user.ip}</span></span>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <span className='text-sm'>Тип <br /> {v.violations}</span>
                        <span className='text-sm'>Повторений</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

