'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import AvatarBlock from '@/components/ui/avatar'
import InputField from '@/components/ui/inputFields'
import { getLot } from '@/services/lot'
import { newReview } from '@/services/review'
import { button, messageError } from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { LotTypes } from '@/types/types'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function page() {

    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const slug = Array.isArray(params.slug) ? params.slug : [params.slug];

    const user = slug[0] || ''
    const lotId = slug[1] || ''

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [lot, setLot] = useState<LotTypes | null>(null)

    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    useEffect(() => {
        if(!lotId) return
        getLot(lotId)
        .then(data => {
            setLot(data)
        })
    }, [lotId])

    const handleReview = async () => {
        
        try {
            await newReview(user, comment, rating, lotId)
            alert('успех')
        } catch (error:any) {
            setMessage(t('review',error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 h-100 md:h-150 xl:h-200 text-black'>
        <div className='flex flex-col justify-center items-center'>

        </div>
        
    </div>
  )
}

