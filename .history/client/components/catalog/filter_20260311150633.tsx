import React from 'react'
import { Sliders } from "lucide-react"; 

export default function Filter() {
  return (
    <div className='flex flex-col justify-start items-start border-r border-gray-200 h-full p-5'>
      <Sliders className='text-orange-600 cursor-pointer' size={25}/>
    </div>
  )
}

