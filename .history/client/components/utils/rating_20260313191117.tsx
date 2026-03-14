import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps {
    rating: number
    showRatingNumber: true
    size:string
}

export default function Rating({rating, showRatingNumber}: RatingProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
        {Array.from({length: 5}).map((_, index) => (
           <Star key={index} fill="currentColor" className={`${rating > index && 'text-orange-600'} text-gray-300`}/>
        ))}
    </div>
  )
}

