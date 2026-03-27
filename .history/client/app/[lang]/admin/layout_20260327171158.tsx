import HeaderAdmin from '@/components/admin/headerAdmin'
import SidebarAdmin from '@/components/admin/sidebarAdmin'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  let message = ''
  return (
    <div className='flex justify-start items-start bg-gray-100 h-screen'>
      <SidebarAdmin />
      <div className='flex flex-col justify-start items-start w-full'>
        <HeaderAdmin />
        <div className='w-full flex flex-col justify-start items-start p-5'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
