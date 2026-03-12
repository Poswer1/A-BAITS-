import React from 'react'
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";
import { hover } from '@/styles/style';

export default function Pagination() {
  return (
    <div className='flex justify-center items-center gap-2'>
        <span className={`${hover} bg-orange-600 p-1 text-white rounded-full`}>
            <ArrowLeft />
        </span>
        <span>1 / 2</span>
        <ArrowRight />
    </div>
  )
}

