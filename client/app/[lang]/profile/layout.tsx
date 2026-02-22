'use client'

import Sidebar from '@/components/profile/sidebar'
import React, { useEffect } from 'react'

function layout({children}: {children: React.ReactNode}) {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) return
  }, [])

  return (
    <div className='flex justify-center items-center h-screen w-full bg-gray-100'>
        <Sidebar />
        {children}
    </div>
  )
}

export default layout
