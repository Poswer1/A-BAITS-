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

  const countPage = Math.floor(maxLot / total)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [page, setPage] = useState(1)

  const handlePagination = () => {
    const params = new URLSearchParams(searchParams)
    setPage(prev => prev + 1)
    params.set('page', page.toString())
    router.push(`${pathname}/${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
     params.set('page', page.toString())
    router.push(`${pathname}/${params.toString()}`)
  }, [page])

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

