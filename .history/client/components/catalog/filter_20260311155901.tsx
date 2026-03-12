'use client'

import { Sliders } from "lucide-react"; 
import { useState } from "react";

export default function Filter() {

  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col bg-white justify-start items-start h-full p-5'>
      <div className={`flex ${open ? 'justify-between' : 'justify-center'} items-center`}>
        {open && (
          <h1>Фильтры</h1>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
    </div>
  )
}

