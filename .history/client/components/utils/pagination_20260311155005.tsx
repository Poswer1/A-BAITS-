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
        <span className='bg-or'>

        </span>
        <span>1 / 2</span>
        <ArrowRight />
    </div>
  )
}

