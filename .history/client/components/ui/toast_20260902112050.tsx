import { animate } from '@/styles/global'
import React from 'react'
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface ToastProps {
    message: string,
    error: string
}

export default function Toast({ message, error }: ToastProps) {

  const isVisible = message.length > 0 || error.length > 0
  const isError = error.length > 0

  return (
    <div
      className={`
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}
        ${animate}
        fixed top-20 right-5 z-100
        flex items-center gap-3
        p-4 pr-10
        rounded-xl border
        backdrop-blur-md
        shadow-xl bg-white
        transition-all duration-300

        ${isError
          ? ' text-red-500 border-red-400'
          : ' text-green-500 border-green-400'}
      `}
    >

      <div>
        {isError
          ? <AlertCircle size={20} />
          : <CheckCircle size={20} />
        }
      </div>

      <span className="text-sm font-medium">
        {message || error}
      </span>
    </div>
  )
}