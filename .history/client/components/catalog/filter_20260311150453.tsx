import React from 'react'
import { Sliders } from "lucide-react"; 

export default function Filter() {
  return (
    <div className='flex flex-col justify-center items-center border-r border-gray-200 h-full'>
      <Sliders className='text-orange-600'/>
    </div>
  )
}

