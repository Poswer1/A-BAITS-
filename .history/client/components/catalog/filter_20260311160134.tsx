'use client'

import { Sliders } from "lucide-react"; 
import { useState } from "react";
import InputField from "../utils/inputFields";

export default function Filter() {

  const [open, setOpen] = useState(false)

  return (
    <div className={`${open && 'w-90'} flex flex-col bg-white justify-start items-start h-full p-5`}>
      <div className={`flex justify-between items-center w-full`}>
        {open && (
          <h1 className="text-black text-lg">Фильтры</h1>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
      <div className="flex flex-col justify-start items-start">
        <span></span>
      </div>
    </div>
  )
}

