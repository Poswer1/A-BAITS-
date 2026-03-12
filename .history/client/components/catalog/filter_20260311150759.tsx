import React from 'react'
import { Sliders } from "lucide-react"; 

export default function Filter() {
  return (
    <div className='flex flex-col bg-white justify-start items-start border-r border-gray-300 h-full w-10'>
      <Sliders className='text-orange-600 cursor-pointer' size={25}/>
    </div>
  )
}

