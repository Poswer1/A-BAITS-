'use client'

import Footer from '@/components/Footer'
import Header from '@/components/header/Header'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import  SocketIo  from '../context/SocketIo'
import BlockedModal from '@/components/violation/blockedModal'

export default function ClientLayout({children}: {children: React.ReactNode}) {

  const path = usePathname()
  
  const hiddenHeader = path.includes('auth')
  const hidden = path.includes('profile') || path.includes('review') || path.includes('auth') || path.includes('admin')
  const hiddenFooter = path.includes('createLot') || path.includes('profile') || path.includes('review') || path.includes('auth') || path.includes('admin')
  const showViolation = path.includes('createLot') || path.includes('editLot')
  const hiddenBlockModal = path.includes('auth')

  return (
    <>
    <SocketIo >
      {!hiddenHeader && <Header />}
      {!hidden && <Navbar/>}
        {children}
      {!hiddenBlockModal && <BlockedModal mode='general'/>}
      {showViolation && <BlockedModal mode=''/>}
      {!hiddenFooter && <Footer />}
    </SocketIo>
    </>
  )
}

