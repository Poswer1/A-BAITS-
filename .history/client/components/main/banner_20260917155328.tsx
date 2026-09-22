'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { button } from '@/styles/global';
import { hover } from '@/styles/style';
import { ChevronDown, RefreshCcw, ShieldCheck, Truck} from "lucide-react";
import Image from 'next/image'
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Banner() {
    const { t } = useTranslation()
    const params = useParams()
    const lang = params.lang as string

  return (
    <div className="flex flex-col md:flex-row justify-start items-center w-full bg-gray-100 z-0 relative h-auto md:h-60 py-5 md:py-0">
        <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/12 via-orange-600/12 to-transparent z-0"></div>
      
          <div className="flex flex-col justify-center items-start gap-4 w-[90%] text-center md:text-start md:w-3/6 lg:ml-20 2x:ml-40 md:m-0">
            <h1 className="text-black font-bold text-xl xl:text-2xl leading-12">{t('main','banner-title')} — <span className="text-white bg-orange-600 p-2 rounded-xl">A-BAITS</span></h1>
            <p className="text-gray-500 text-xs 2xl:text-base">{t('main','banner-description')}</p>
          </div>
        

          <div className="lg:w-3/4 2xl:w-2/4 bg-white/35 h-full clip-45 md:flex justify-end  items-center hidden md:block">
            <div className="flex flex-col justify-center items-start gap-2 w-3/4 md:w-2/4">
              <h1 className="text-orange-600 text-xl font-bold">{t('main','block-title')}</h1>
              <span className="text-gray-500 text-sm">{t('main','block-description')}</span>
              <Link href={`/${lang}/allLots`} className={`${button} `}>{t('main','block-button')}</Link>
            </div>
            <Image src='/images/main/photoBanner.png' alt="" width={300} height={300} className="hidden md:block w-[200px] xl:w-[250px] 2xl:w-[300px] h-auto rotate-20"/>
          </div>
          
        </div>
  )
}
