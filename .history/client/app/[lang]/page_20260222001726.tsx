'use client'

import { hover } from "@/styles/style";
import Image from "next/image";
import { RefreshCcw, ShieldCheck, Truck} from "lucide-react";
import LotCard from "@/components/lotCard";
import { useTranslation } from "../context/TranslationProvider";
import { useEffect, useState } from "react";
import { getAllLot } from "@/services/lot";

export default function Home() {

  const { t } = useTranslation()
  const [allLot, setAllLot] = useState<any[]>([])

  useEffect(() => {
    getAllLot()
    .then(data => {
      setAllLot(data)
    })
  }, [])

  const Features = [
    { text: t('main','features-one'), icon: RefreshCcw },
    { text: t('main','features-two'), icon: ShieldCheck },
    { text: t('main','features-three'), icon: Truck },
  ];


  return (

    <div className="flex flex-col justify-start items-center gap-10">
        <div className="flex justify-start items-center w-full bg-gray-100 z-0 relative ">
        <div className="absolute inset-0 h-full bg-gradient-to-l from-orange-600/12 via-orange-600/12 to-transparent z-0"></div>
      
          <div className="flex flex-col justify-center items-start gap-4 w-3/6 ml-40">
            <h1 className="text-black font-bold text-2xl leading-12">{t('main','banner-title')} — <span className="text-white bg-orange-600 p-2 rounded-xl">A-BAITS</span></h1>
            <p className="text-gray-500">{t('main','banner-description')}</p>
            <div className="flex justify-center items-center gap-10">
              {Features.map((item) => {
                const Icon = item.icon
                return (
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="p-4 rounded-full border border-orange-600"><Icon size={25}/></div>
                  <span className="text-black">{item.text}</span>
                </div>
                )
              })}
            </div>
          </div>
        

          <div className="w-2/4 bg-white/35 h-90 clip-45 flex justify-end  items-center">
            <div className="flex flex-col justify-center items-start gap-2 w-2/4">
              <h1 className="text-orange-600 text-2xl font-bold">{t('main','block-title')}</h1>
              <span className="text-gray-500">{t('main','block-description')}</span>
              <button className={` ${hover} bg-orange-600 text-white p-2 w-2/4 rounded-md`}>{t('main','block-button')}</button>
            </div>
            <Image src='/images/main/fishman.png' alt="" width={300} height={300} className="w-[300px] h-auto"/>
          </div>
          
        </div>
        <div className="flex flex-col justify-center items-start w-[90%]">
           <h1 className="text-3xl font-bold text-black"><span className="text-orange-600">Топ </span>{t('global','lot')}</h1>
           <div className="flex justify-start items-center w-full px-10 py-5 gap-15">
            {allLot.slice(0, 4).map((lot) => (
              <LotCard lot={lot}/>
            ))}
           </div>
        </div>
    </div>

  );
}
