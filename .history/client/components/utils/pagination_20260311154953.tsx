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
        <span className='text-black'>1 / 2</span>
        <ArrowRight />
    </div>
  )
}

