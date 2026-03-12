import React from 'react'
import { Sliders } from "lucide-react"; 

export default function Filter() {
  return (
    <div className='flex flex-col justify-start items-center border-r border-gray-500 h-full'>
      <Sliders className='text-orange-600 cursor-pointer' size={25}/>
    </div>
  )
}

