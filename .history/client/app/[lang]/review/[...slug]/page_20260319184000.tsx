'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import InputField from '@/components/ui/inputFields'
import { newReview } from '@/services/review'
import { button, messageError } from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'


export default function page() {

    const params = useParams()
    const slug = params.slug

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    
    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    const handleReview = async () => {
        
        try {
            await newReview(name, comment, rating)
            alert('успех')
        } catch (error:any) {
            setMessage(t('review',error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='w-full flex justify-center items-center bg-gray-100 h-100 md:h-150 xl:h-200 text-black'>
        <div className='bg-white md:rounded-xl p-5 flex flex-col justify-center items-center w-full md:w-2/5 xl:w-1/4 gap-2'>
            <h1 className='text-3xl'>{t('review', 'feedback')}</h1>
            <div className='flex justify-center items-center gap-5'>
                {Array.from({length: 5}).map((_, index) => (
                    <Star key={index} fill="currentColor" className={`${hover} ${rating > index && 'text-orange-600'} text-gray-300`} size={40} onClick={() => handleRating(index)}/>
                ))}
            </div>
            <InputField label='' value={comment} type='text' placeholder={t('review', 'shortComment')} onChange={setComment} textarea={true} hTextArea={50}/>
            {message && (
                <span className={`${animationOpacity} mt-1 w-full flex justify-start text-red-600`}>{message}</span>
            )}
            <button onClick={handleReview} className={`${button} w-full mt-1`}>{t('review', 'leaveFeedback')}</button>
        </div>
    </div>
  )
}

