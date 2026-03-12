import React from 'react'
import { 
  ArrowRight, 
  ArrowLeft, 
} from "lucide-react";
import { hover } from '@/styles/style';

interface PaginationProps {
  total:number
}

export default function Pagination({total}:PaginationProps) {
  return (
    {}
    <div className='flex justify-center items-center gap-2 w-full'>
        <span className={`${hover} bg-orange-600 p-1 text-white rounded-full`}>
            <ArrowLeft />
        </span>
        <span>1 / 2</span>
        <span className={`${hover} bg-orange-600 p-1 text-white rounded-full`}>
            <ArrowRight />
        </span>
    </div>
  )
}

