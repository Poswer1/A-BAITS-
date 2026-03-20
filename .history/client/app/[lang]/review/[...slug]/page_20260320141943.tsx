'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import InputField from '@/components/ui/inputFields'
import { newReview } from '@/services/review'
import { button} from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'


export default function page() {
    const params = useParams()
    const slug = Array.isArray(params.slug) ? params.slug : [params.slug];

    const userId = slug[0] || ''
    const lotId = slug[1] || ''

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    const handleReview = async () => {
        
        try {
            const data = await newReview(userId, comment, rating, lotId)
            if(data.success) {
                setMessage('ураруараур')
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

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 h-auto md:h-150 xl:h-200 text-black'>
        <div className='flex justify-start items-start w-[90%]'>
        
        </div>
    </div>
  )
}

