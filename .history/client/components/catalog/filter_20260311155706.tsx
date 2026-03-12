'use client'

import { Sliders } from "lucide-react"; 

export default function Filter() {

  const [open, setOpen] = use

  return (
    <div className='flex flex-col bg-white justify-start items-start h-full p-5'>
      <Sliders className='text-orange-600 cursor-pointer' size={25}/>
    </div>
  )
}

