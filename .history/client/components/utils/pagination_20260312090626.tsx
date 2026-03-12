import React from 'react'
import { 
  ArrowRight, 
  ArrowLeft, 
} from "lucide-react";
import { hover } from '@/styles/style';

interface PaginationProps {
  total:number
  maxLot: number
}

export default function Pagination({total, maxLot}:PaginationProps) {
  return (
    <>
    {total >= maxLot && (

    )}

    </>
  )
}

