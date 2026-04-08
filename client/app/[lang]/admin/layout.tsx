
import SidebarAdmin from '@/components/admin/sidebarAdmin'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col md:flex-row justify-start items-start bg-gray-100 min-h-screen md:min-h-[90vh] text-black'>
      <SidebarAdmin />
        <div className='w-full flex flex-col justify-start items-start md:p-5 max-h-[92vh] md:overflow-y-auto'>
          {children}
        </div>
    </div>
  )
}

export default layout
