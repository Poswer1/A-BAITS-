'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { hover } from '@/styles/style';
import { ChevronDown, RefreshCcw, ShieldCheck, Truck} from "lucide-react";
import Image from 'next/image'
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Banner() {
    const { t } = useTranslation()
     const Features = [
        { text: t('main','features-one'), icon: RefreshCcw },
        { text: t('main','features-two'), icon: ShieldCheck },
        { text: t('main','features-three'), icon: Truck },
    ];
    const params = useParams()
    const lang = params.lang as string

  return (
    <div className="flex flex-col md:flex-row justify-start items-center w-full bg-gray-100 z-0 relative ">
        <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/12 via-orange-600/12 to-transparent z-0"></div>
      
          <div className="flex flex-col justify-center items-start gap-4 w-[90%] text-center md:text-start md:w-3/6 lg:ml-20 2x:ml-40 m-5 md:m-0">
            <h1 className="text-black font-bold text-xl md:text-2xl leading-12">{t('main','banner-title')} — <span className="text-white bg-orange-600 p-2 rounded-xl">A-BAITS</span></h1>
            <p className="text-gray-500 text-sm 2xl:text-base">{t('main','banner-description')}</p>
            {/* <div className="flex justify-center items-start gap-10">
              {Features.map((item) => {
                const Icon = item.icon
                return (
                <div key={item.text} className="flex flex-col justify-center items-center text-center gap-2 mb-5 md:mb-0">
                  <div className="p-3 2xl:p-4 md:p-3 rounded-full border text-black border-orange-600"><Icon size={25}/></div>
                  <span className="text-black 2xl:text-base lg:text-sm text-sm">{item.text}</span>
                </div>
                )
              })}
            </div> */}
          </div>
        

          
          
        </div>
  )
}
