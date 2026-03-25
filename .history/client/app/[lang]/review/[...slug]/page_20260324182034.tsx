'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import InputField from '@/components/ui/inputFields'
import { newReview } from '@/services/review'
import { button} from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { ChevronLeft, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'


export default function page() {
    const params = useParams()
    const router = useRouter()
    const slug = Array.isArray(params.slug) ? params.slug : [params.slug];

    const userId = slug[0] || ''
    const lotId = slug[1] || ''

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [successReview, setSuccessReview] = useState(false)

    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    const handleReview = async () => {
        
        try {
            const data = await newReview(userId, comment, rating, lotId)
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
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 h-auto md:h-150 xl:h-200 text-black gap-10'>
            {successReview ? (

            ): (

            )}
    </div>
  )
}

