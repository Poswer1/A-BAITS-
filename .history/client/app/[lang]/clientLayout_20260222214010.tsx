'use client'

import Footer from '@/components/Footer'
import Header from '@/components/header/Header'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ClientLayout({children}: {children: React.ReactNode}) {

  const path = usePathname()
  
  const hidden = path.includes('profile')
  const hiddenFooter = path.includes('createLot') || path.includes('profile')

  return (
    <>
        <Header />
        {!hidden && <Navbar/>}
        {children}
        {!hiddenFooter && <Footer />}
    </>
  )
}

