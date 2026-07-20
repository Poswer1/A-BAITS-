'use client'

import LotCardV2 from '../card/lotCardV2';
import LotCard from '../card/lotCard';
import { LotTypes } from '@/types/types';
import Pagination from '../ui/pagination';
import { useTranslation } from '@/app/context/TranslationProvider';
import { useEffect, useState } from 'react';

interface CatalogProps {
    category:string | undefined;
    subCategory:string | undefined;
    subSubCategory:string | undefined;
    city: string | undefined;
    lots: LotTypes[]
    total: number
    searchValue:string
}

export default function Catalog({category, subCategory, subSubCategory, city, lots, total, searchValue}:CatalogProps) {
  const {t} = useTranslation()
  const [mobile, setMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      console.log("window", window.innerWidth)
      setMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div className='flex flex-col md:p-2 justify-start items-start w-full mt-2 md:min-h-200 overflow-x-hidden'>
        <h1 className='text-md text-gray-500 px-2 md:p-0'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        {searchValue && (
          <h1 className="text-black text-xl md:text-2xl px-2 md:p-0">
            {searchValue?.toLowerCase() === "alllots" ? (
              <span className="text-orange-600">
               {t('catalog','allLots')}
              </span>
            ) : (
              <>
                Результаты по поиску{" "}
                <span className="text-orange-600">
                  {searchValue.length >= 30
                    ? searchValue.slice(0, 30) + "..."
                    : searchValue.toUpperCase()}
                </span>
              </>
            )}
          </h1>
        )}
        <span className='text-gray-500 text-sm  px-2 md:p-0'>Найдено лотов: {total}</span>
        <div className='flex flex-col justify-start items-start w-full mt-2'>
          {mobile === null ? null : (
              mobile ? (
                
                  <div className="w-full grid grid-cols-2 gap-2">
                    {lots.map((l) => (
                      <LotCard key={l._id} lot={l} openFrom='catalog'/>
                    ))}
                  
                </div>
              ) : (
                lots.map((l) => (
                  <LotCardV2 key={l._id} lot={l}/>
                ))
              )
            )}
          <div className={`w-full`}>
            <Pagination total={total} maxLot={25}/>
          </div>
        </div>
    </div>
  )
}