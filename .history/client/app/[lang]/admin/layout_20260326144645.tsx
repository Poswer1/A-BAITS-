import SidebarAdmin from '@/components/admin/sidebarAdmin'
import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex justify-start items-start'>
      <SidebarAdmin />
    </div>
  )
}

export default layout
