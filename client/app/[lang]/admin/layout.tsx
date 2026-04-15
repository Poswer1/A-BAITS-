import SidebarAdmin from '@/components/admin/sidebarAdmin'
import React from 'react'
import { cookies } from 'next/headers';
import { getRoleUser } from '@/services/user';

async function layout({children}: {children: React.ReactNode}) {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if(!token) {
    return
  }
  const role = await getRoleUser(token) 
  if (role !== 'admin') return null

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
