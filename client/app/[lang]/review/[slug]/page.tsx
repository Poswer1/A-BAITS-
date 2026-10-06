'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import InputField from '@/components/ui/inputFields'
import Success from '@/components/ui/success'
import Toast from '@/components/ui/toast'
import { newReview } from '@/services/review'
import { button} from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { ChevronLeft, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'


export default function page() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [successReview, setSuccessReview] = useState(false)

    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    const handleReview = async () => {
        
        try {
            const data = await newReview(slug, comment, rating)
            if(data.success) {
                setSuccessReview(true)
                setRating(1)
                setComment('')
            }
        } catch (error:any) {
            setMessage(t('review',error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

    const handleBack = () => {
        router.back()
    }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 h-[90vh] text-black gap-10'>
            {successReview ? (
                <Success title={t('review', 'ReviewSuccess')}/>
            ): (
                <div className='bg-white md:rounded-xl p-3 md:p-5 flex flex-col justify-center items-center w-full md:w-2/5 2xl:w-1/4 gap-2'>
                    <h1 className='text-3xl font-bold text-black'><span className='text-orange-600'>Ваш</span> {t("review", 'feedback')}</h1>
                    <div className='flex justify-center items-center gap-5'>
                        {Array.from({length: 5}).map((_, index) => (
                            <Star key={index} fill="currentColor" className={`${hover} ${rating > index && 'text-orange-600'} text-gray-300`} size={40} onClick={() => handleRating(index)}/>
                        ))}
                    </div>
                    <InputField label='' value={comment} type='text' placeholder={t('review', 'shortComment')} onChange={setComment} textarea={true} hTextArea={50}/>
                    <div className='flex w-full justify-center items-center'>
                        <span onClick={handleBack} className={`text-black flex gap-1 mr-4 ${hover}`}><ChevronLeft /> Назад</span>
                        <button onClick={handleReview} className={`${button} w-full mt-1`}>{t('review', 'leaveFeedback')}</button>
                    </div>
                </div>
            )}
        <Toast error={message} message=''/>
    </div>
  )
}

