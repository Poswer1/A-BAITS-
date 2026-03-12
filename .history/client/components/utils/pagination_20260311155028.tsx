import React from 'react'
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

export default function Pagination() {
  return (
    <div className='flex justify-center items-center'>
        <span className='bg-orange-600 p-2 text-white rounded-full'>
            <ArrowLeft />
        </span>
        <span>1 / 2</span>
        <ArrowRight />
    </div>
  )
}

