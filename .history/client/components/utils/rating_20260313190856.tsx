import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps {
    rating: number
    showRatingNumber: true
}

export default function Rating({rating, showRatingNumber}: RatingProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <Star />
    </div>
  )
}

