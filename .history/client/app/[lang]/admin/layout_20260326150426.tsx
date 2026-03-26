import SidebarAdmin from '@/components/admin/sidebarAdmin'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex justify-start items-start bg-gray-100'>
      <SidebarAdmin />
    </div>
  )
}

export default layout
