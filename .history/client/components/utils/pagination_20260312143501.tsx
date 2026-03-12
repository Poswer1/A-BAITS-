'use client'

import { 
  ArrowRight, 
  ArrowLeft, 
} from "lucide-react";
import { hover } from '@/styles/style';
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  total:number
  maxLot: number
}

export default function Pagination({total, maxLot}:PaginationProps) {

  const countPage = Math.floor(maxLot / total)

  const searchParams = useSearchParams()

  const handlePagination = () => {
    const params = new URLSearchParams(searchParams)
    
  }

  return (
    <>
    {total >= maxLot && (
      <div className='flex justify-center items-center gap-2 w-full'>
          <span className={`${hover} bg-orange-600 p-1 text-white rounded-full`}>
              <ArrowLeft />
          </span>
          <span>1 / {countPage}</span>
          <span className={`${hover} bg-orange-600 p-1 text-white rounded-full`}>
              <ArrowRight />
          </span>
      </div>
    )}
    </>
  )
}

