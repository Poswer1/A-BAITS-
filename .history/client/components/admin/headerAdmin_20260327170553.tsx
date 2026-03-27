'use client'

import { usePathname } from "next/navigation"

export default function HeaderAdmin() {

    const path = usePathname()

    let title = ''
    if(path.includes(''))

  return (
    <div className="flex justify-start items-center w-full p-5 bg-white">
      <h1></h1>
    </div>
  )
}

