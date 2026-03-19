'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import AvatarBlock from '@/components/ui/avatar'
import InputField from '@/components/ui/inputFields'
import Loading from '@/components/ui/loadig'
import { getLot } from '@/services/lot'
import { newReview } from '@/services/review'
import { getUserById } from '@/services/user'
import { button, loadingBlock, messageError } from '@/styles/global'
import { animationOpacity, hover } from '@/styles/style'
import { LotTypes, UserTypes } from '@/types/types'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function page() {

    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const params = useParams()
    const slug = Array.isArray(params.slug) ? params.slug : [params.slug];

    const userId = slug[0] || ''
    const lotId = slug[1] || ''

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [lot, setLot] = useState<LotTypes | null>(null)
    const [user, setUser] = useState<UserTypes | null>(null)

    const {t} = useTranslation()

    const handleRating = (index:number) => {
        setRating(index + 1)
    }

    useEffect(() => {
        if(!lotId || !userId) return
        getLot(lotId)
        .then(data => {
            setLot(data)
        })
        getUserById(userId)
        .then(data => {
            setUser(data)
        })
        setLoading(false)
    }, [lotId, userId])

    const handleReview = async () => {
        
        try {
            await newReview(userId, comment, rating, lotId)
            alert('успех')
        } catch (error:any) {
            setMessage(t('review',error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-gray-100 h-auto md:h-150 xl:h-200 text-black'>
        {loading ? (
            <div className={loadingBlock}>
                <Loading />
            </div>
        ): (

        )}
        
    </div>
  )
}

