'use client'

import { 
  ArrowRight, 
  ArrowLeft, 
} from "lucide-react";
import { hover } from '@/styles/style';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaginationProps {
  total:number
  maxLot: number
}

export default function Pagination({total, maxLot}:PaginationProps) {

  const countPage = Math.ceil(total / maxLot)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [page, setPage] = useState(1)

  const handleNext = () => {
    if(page === maxLot) return
    setPage(prev => prev + 1)
  }

  const handleBack = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }, [page])

  return (
    <>
    {total >= 1 && (
      <div className='flex justify-center items-center gap-2 w-full'>
          <span onClick={handleBack} className={`${hover} ${Number(page) === 0 ? 'opa'} bg-orange-600 p-1 text-white rounded-full`}>
              <ArrowLeft />
          </span>
          <span>{page} / {countPage}</span>
          <span onClick={handleNext} className={` ${Number(page) === maxLot ? 'opacity-50' : `${hover}`} bg-orange-600 p-1 text-white rounded-full`}>
              <ArrowRight />
          </span>
      </div>
    )}
    </>
  )
}

