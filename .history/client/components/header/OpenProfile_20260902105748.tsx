import { animationOpacity, hover } from '@/styles/style'
import { useEffect, useRef, useState } from 'react';
import {Plus, LogOut} from 'lucide-react';
import { useTranslation } from '@/app/context/TranslationProvider';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useClickOutside } from '@/utils/useClickOutside';
import { hoverCat } from '@/styles/categoryList';
import { animate } from '@/styles/global';
import OpenNotification from './openNotification';
import { logout } from '@/services/auth';

interface OpenProfile {
   setOpenProfile:(type:boolean) => void
   name:string
   open:boolean
}

function OpenProfile({setOpenProfile, name, open}: OpenProfile) {

    const params = useParams()
    const lang = params.lang as string

    const {t} = useTranslation()

    const modalRef = useClickOutside(setOpenProfile)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const [openNotification, setOpenNotification] = useState(false)

    const handleLogout = async () => {
        await logout()
        window.location.reload()
    }

    const linkClass = `${hoverCat} block w-full py-3 px-4 cursor-pointer pointer-events-auto text-left`
    const menuClass = isMobile
      ? 'fixed left-2 right-2 top-16 z-50 w-auto rounded-2xl shadow-xl overflow-hidden'
      : 'absolute right-[-10] md:right-0 top-10 z-20 w-40 rounded-xl'

  return (
    <>
      <div ref={modalRef} className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} ${animate} ${openNotification && 'hidden'} overflow-hidden flex flex-col justify-center items-center bg-white text-black ${menuClass}`}>
            <Link href={`/${lang}/profile/${name}`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header','modalProfile-profile')}</Link> 
            <Link href={`/${lang}/profile/sell/Active`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('profile', 'myLots')}</Link>
            <Link href={`/${lang}/profile/buy/Active`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header',"modalProfile-history")}</Link>
            <Link href={`/${lang}/profile/chat`} className={linkClass} onClick={() => setOpenProfile(false)}>Чат</Link>
            <span onClick={() => {setOpenNotification(true), setOpenProfile(false)}} className={`${linkClass} md:hidden`}>{t('header', 'notification')}</span>
            <span className={`${linkClass} flex gap-1 items-center bg-red-500/10 text-red-500`} onClick={() => {setOpenProfile(false), handleLogout()}}><LogOut size={18}/>{t('header','logout')}</span>
            <Link href={`/${lang}/createLot`} onClick={() => setOpenProfile(false)} className={`${hover} p-3 bg-orange-600 text-white flex justify-center items-center gap-1 w-full`}><Plus />{t('header','modalProfile-createLot')}</Link> 
      </div>
    {isMobile && (
      <OpenNotification open={openNotification} setOpen={setOpenNotification}/>
    )}
    </>
  )
}

export default OpenProfile
