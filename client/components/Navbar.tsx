'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { arrowActive, hover, hoverLink} from '@/styles/style';
import { ChevronDown, Plus} from 'lucide-react';
import { useState } from 'react';

function Navbar() {

    const {t} = useTranslation()

    const [openContact, setOpenContact] = useState(false)

  return (
    <div className='flex w-full bg-[#0F0F0F]  p-2 justify-center'>
        <div className='flex justify-start items-center gap-5 text-white w-[90%]'>
            <span className={hoverLink}>{t('navbar', 'newLot')}</span>
            <span className={hoverLink}>{t('navbar','lotfrom1UAH')}</span>
            <span className={hoverLink}>Топ {t('global','lot')}</span>
            <span className={hoverLink}>{t('navbar','news')}</span>
            <span className={hoverLink}>Наш форум</span>
            <div className='relative'>   
                <span onClick={() => setOpenContact(prev => !prev)} className={`${hoverLink} flex justify-center items-center gap-2`}>{t('navbar','contact')} <ChevronDown className={arrowActive(openContact)}/></span>
                {openContact && (
                    <div className='bg-[#0F0F0F] w-50 h-50 absolute top-[100%] z-10 rounded-xl left-0'>
                    </div>
                )}
            </div>
            <span className={`${hover} p-2 bg-gray-200/30 rounded-md text-white`}>{t('navbar','support')}</span>
        </div>
    </div>
  )
}

export default Navbar
