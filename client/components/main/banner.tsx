'use client'

import { useTranslation } from '@/app/context/TranslationProvider';
import { hover } from '@/styles/style';
import { ChevronDown, RefreshCcw, ShieldCheck, Truck} from "lucide-react";
import Image from 'next/image'

export default function Banner() {
    const { t } = useTranslation()
     const Features = [
        { text: t('main','features-one'), icon: RefreshCcw },
        { text: t('main','features-two'), icon: ShieldCheck },
        { text: t('main','features-three'), icon: Truck },
    ];

  return (
    <div className="flex flex-col md:flex-row justify-start items-center w-full bg-gray-100 z-0 relative ">
        <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/12 via-orange-600/12 to-transparent z-0"></div>
      
          <div className="flex flex-col justify-center items-start gap-4 w-[90%] text-center md:text-start md:w-3/6 lg:ml-20 2x:ml-40">
            <h1 className="text-black font-bold text-2xl leading-12">{t('main','banner-title')} — <span className="text-white bg-orange-600 p-2 rounded-xl">A-BAITS</span></h1>
            <p className="text-gray-500 lg:text-sm 2xl:text-base">{t('main','banner-description')}</p>
            <div className="flex justify-center items-start gap-10">
              {Features.map((item) => {
                const Icon = item.icon
                return (
                <div key={item.text} className="flex flex-col justify-center items-center text-center gap-2 mb-5 md:mb-0">
                  <div className="p-3 2xl:p-4 md:p-3 rounded-full border text-black border-orange-600"><Icon size={25}/></div>
                  <span className="text-black 2xl:text-base lg:text-sm text-sm">{item.text}</span>
                </div>
                )
              })}
            </div>
          </div>
        

          <div className="lg:w-3/4 2xl:w-2/4 bg-white/35 h-90 clip-45 md:flex justify-end  items-center hidden md:block">
            <div className="flex flex-col justify-center items-start gap-2 w-3/4 md:w-2/4">
              <h1 className="text-orange-600 2xl:text-2xl lg:text-xl font-bold">{t('main','block-title')}</h1>
              <span className="text-gray-500 lg:text-sm 2xl:text-base">{t('main','block-description')}</span>
              <button className={`${hover} bg-orange-600 text-white p-2 w-full md:w-2/4 rounded-md`}>{t('main','block-button')}</button>
            </div>
            <Image src='/images/main/fishman.png' alt="" width={300} height={300} className="hidden md:block 2xl:w-[300px] lg:w-[250px] h-auto"/>
          </div>
          
        </div>
  )
}
