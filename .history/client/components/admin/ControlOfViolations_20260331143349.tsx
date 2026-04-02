'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { ViolationsTypes } from '@/types/types'
import AvatarBlock from '../ui/avatar'
import { getRelativeTime } from '../ui/relativeTime'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface ControlOfViolationsProps {
    allViolations:ViolationsTypes[]
}

export default function ControlOfViolations({allViolations}: ControlOfViolationsProps) {
  
    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string
  
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
                        <Link href={`/${lang}/lot/${v.lot.lotNumber}`} className='text-sm w-30'>Лот <br /> №<span className='text-ora'>{v.lot.lotNumber}</span></Link>
                        <span className='text-sm w-30'>Тип <br /> {v.violations}</span>
                        <span className='text-sm w-30'>Повтореные <br /> {v.repeated}</span>
                        <span className='text-sm w-30'>Дата <br /> {getRelativeTime(v.createdAt, lang)}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

