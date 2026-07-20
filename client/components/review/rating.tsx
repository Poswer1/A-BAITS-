import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps {
    rating: number
    showRatingNumber?: boolean
    size:number
}

export default function Rating({rating, showRatingNumber, size}: RatingProps) {
  return (
    <div className='flex flex-col justify-center items-start gap-1'>
        <div className='flex justify-start items-center gap-2'>
            {Array.from({length: 5}).map((_, index) => (
                <Star key={index} fill="currentColor" className={`${rating > index && 'text-orange-600'} text-gray-300`} size={size}/>
            ))}
        </div>
        {showRatingNumber && (
            <h1 className='font-bold'>{rating} / 5.0</h1>
        )}
    </div>
  )
}

