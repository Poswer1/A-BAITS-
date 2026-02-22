import { animationOpacity, hover } from '@/styles/style'
import { useEffect, useRef } from 'react';
import {Plus, LogOut} from 'lucide-react';
import { useTranslation } from '@/app/context/TranslationProvider';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useClickOutside } from '@/utils/useClickOutside';
import { hoverCat } from '@/styles/categoryList';

interface OpenProfile {
   setOpenProfile:(type:boolean) => void
}

function OpenProfile({setOpenProfile}: OpenProfile) {

    const params = useParams()
    const lang = params.lang as string

    const {t} = useTranslation()

    const modalRef = useClickOutside(setOpenProfile)

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const linkClass = `${hoverCat} py-2 px-4 w-full`

  return ( 
    <div ref={modalRef} className={` ${animationOpacity} flex flex-col justify-center items-center bg-white rounded-xl absolute top-10 text-black z-20 w-40`}>
        <Link href={`/${lang}/profile`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header','modalProfile-profile')}</Link> 
        <Link href={`/${lang}/profile/myLots`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('profile', 'myLots')}</Link>
        <Link href={`/${lang}/profile/chat`} className={linkClass} onClick={() => setOpenProfile(false)}>Чат</Link>
        <Link href={`/${lang}/profile/historyBids`} className={linkClass} onClick={() => setOpenProfile(false)}>{t('header',"modalProfile-history")}</Link>
        <span className={linkClass} onClick={() => setOpenProfile(false)}>{t('header','modalProfile-support')}</span>
        <Link href={`/${lang}/createLot`} onClick={() => setOpenProfile(false)} className={`${hover} p-2 bg-orange-600 rounded-b-xl text-white flex justify-center items-center gap-1 w-full`}><Plus />{t('header','modalProfile-createLot')}</Link>
        
    </div>
  )
}

export default OpenProfile
