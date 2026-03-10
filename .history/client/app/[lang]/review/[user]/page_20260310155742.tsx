'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { getUserByName } from '@/services/user'
import { UserTypes } from '@/types/types'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function page() {

    const params = useParams()
    const name = params.user as string

    const [user, setUser] = useState<UserTypes | null>(null)
    
    const {t} = useTranslation()

    useEffect(() => {
        if(!name)
        getUserByName(name)
        .then(data => (
            setUser(data)
        ))
    }, [name])

  return (
    <div className='w-full flex justify-center items-center bg-gray-100 h-screen'>
        <div className='bg-white p-2'>
            <h1 className='text-3xl'>{t('review', 'feedback')}</h1>
            <div className='flex justify-center items-center gap-2'>
                {Array.from({length: 5}).map((_, index) => (
                    <Star fill="currentColor" className={` text-gray-300`}/>
                ))}
            </div>
        </div>
    </div>
  )
}

