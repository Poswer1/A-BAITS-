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
    const mobile = window.innerWidth <= 768
    const [openNotification, setOpenNotification] = useState(false)

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const linkClass = `${hoverCat} py-2 px-4 w-full`

  return (
    <>
      <div ref={modalRef} className={`${open ? "h-70 md:h-60" : "h-0"} ${animate} ${openNotification && 'hidden'} overflow-hidden flex flex-col justify-center items-center bg-white rounded-xl absolute right-[-10] md:right-0 top-10 text-black z-20 w-40`}>
            <Link href={`/${lang}/profile/${name}`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header','modalProfile-profile')}</Link> 
            <Link href={`/${lang}/profile/sell/Active`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('profile', 'myLots')}</Link>
            <Link href={`/${lang}/profile/buy/Active`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header',"modalProfile-history")}</Link>
            <Link href={`/${lang}/profile/chat`} className={linkClass} onClick={() => setOpenProfile(false)}>Чат</Link>
            <span onClick={() => {setOpenNotification(true), setOpenProfile(false)}} className={`${linkClass} md:hidden`}>{t('header', 'notification')}</span>
            <span className={linkClass} onClick={() => setOpenProfile(false)}>{t('header','modalProfile-support')}</span>
            <Link href={`/${lang}/createLot`} onClick={() => setOpenProfile(false)} className={`${hover} p-2 bg-orange-600 rounded-b-xl text-white flex justify-center items-center gap-1 w-full`}><Plus />{t('header','modalProfile-createLot')}</Link> 
      </div>
    {mobile && (
      <OpenNotification open={openNotification} setOpen={setOpenNotification}/>
    )}
    </>
  )
}

export default OpenProfile
