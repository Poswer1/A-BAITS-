import { ReviewTypes } from '@/types/types'
import React from 'react'

export default function ReviewBlock({review}: {review: ReviewTypes}) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 bg-white p-4 border-t border-b border-gray-200 w-full">
          <Link href={`/${lang}/profile/${review.from?.name}`} className="flex justify-center items-center gap-2 cursor-pointer">
            <AvatarBlock avatar={review.from?.avatar} size="32"/> 
            <span className="text-sm">{review.from?.name}</span>
          </Link>
          <div className='flex justify-center items-center gap-1'>
          <Rating rating={review.rating} size={16}/>
          </div>
         
          <Link href={`/${lang}/lot/${review.lot.lotNumber}`} className='flex justify-center items-center gap-1'>
            <img src={`${BASE_URL}${review?.lot.images?.[0]}`} className='w-10 rounded-md'/>
            <div className='flex flex-col justify-center items-start'>
             <span className='text-sm text-gray-500 hidden md:flex'>{review.lot.name}</span>
             <span className='text-sm text-gray-500 md:hidden'>{review.lot.name.length >= 30 ? review.lot.name.slice(0, 30) + '...' : review.lot.name}</span>
             <span className='text-sm'>№ <span className='text-orange-600'>{review.lot.lotNumber}</span></span>
            </div>
          </Link>
         
          <p className="text-sm">{review.comment}</p>
          <span className='text-sm text-gray-500'>{getRelativeTime(review.createdAt, lang)}</span>
    </div>
  )
}

