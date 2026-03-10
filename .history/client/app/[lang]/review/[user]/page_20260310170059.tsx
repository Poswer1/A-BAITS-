'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import InputField from '@/components/utils/inputFields'
import { getUserByName } from '@/services/user'
import { button, messageError } from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { UserTypes } from '@/types/types'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function page() {

    const params = useParams()
    const name = params.user as string

    const [user, setUser] = useState<UserTypes | null>(null)
    const [rating, setRating] = useState(1)
    const [coment, setComent] = useState('')
    const [message, setMessage] = useState('')
    
    const {t} = useTranslation()

    useEffect(() => {
        if(!name)
        getUserByName(name)
        .then(data => (
            setUser(data)
        ))
    }, [name])

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    const handleReview = async () => {
        
    }

  return (
    <div className='w-full flex justify-center items-center bg-gray-100 h-screen'>
        <div className='bg-white p-5 flex flex-col justify-center items-center w-1/4'>
            <h1 className='text-3xl'>{t('review', 'feedback')}</h1>
            <div className='flex justify-center items-center gap-5'>
                {Array.from({length: 5}).map((_, index) => (
                    <Star key={index} fill="currentColor" className={`${hover} ${rating > index && 'text-orange-600'} text-gray-300`} size={40} onClick={() => handleRating(index)}/>
                ))}
            </div>
            <InputField label='' value={coment} type='text' placeholder={t('review', 'shortComment')} onChange={setComent} textarea={true} hTextArea={50}/>
            {message && (
                <span className={`${messageError} ${animationOpacity} mt-1`}>{message}</span>
            )}
            <button className={`${button} w-full mt-1`}>{t('review', 'leaveFeedback')}</button>
        </div>
    </div>
  )
}

