'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { arrowActive, hover, hoverLink} from '@/styles/style';
import { ChevronDown, Plus} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';


function Navbar() {

    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const [openContact, setOpenContact] = useState(false)

  return (
    <div className='flex w-full bg-[#0F0F0F] p-2 justify-center'>
        <div className='flex justify-start items-center gap-6 md:gap-5 text-white w-full md:w-[90%] overflow-x-auto whitespace-nowrap'>
            <Link href={`/${lang}/#lot-newLots`} className={hoverLink}>{t('navbar', 'newLot')}</Link>
            <Link href={`/${lang}/#lot-1hryvnia`} className={hoverLink}>{t('navbar','lotfrom1UAH')}</Link>
            <Link href={`/${lang}/#lot-topLot`} className={hoverLink}>Топ {t('global','lot')}</Link>
            <Link href={`/${lang}/blog`} className={hoverLink}>{t('navbar','news')}</Link>
            <Link href='https://t.me/auctionbaitsUA' target="_blank" rel="noopener noreferrer" className={hoverLink}>Наш форум</Link>
            <div className='relative'>   
                <span onClick={() => setOpenContact(prev => !prev)} className={`${hoverLink} flex justify-center items-center gap-2`}>{t('navbar','contact')} <ChevronDown className={arrowActive(openContact)}/></span>
                {openContact && (
                    <></>
                )}
            </div>
            <span className={`${hover} p-2 bg-gray-200/30 rounded-md text-white`}>{t('navbar','support')}</span>
        </div>
    </div>
  )
}

export default Navbar
