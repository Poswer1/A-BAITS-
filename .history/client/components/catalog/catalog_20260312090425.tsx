import React from 'react'
import LotCardV2 from '../lotCardV2';
import { LotTypes } from '@/types/types';
import Pagination from '../utils/pagination';

interface CatalogProps {
    category:string | undefined;
    subCategory:string | undefined;
    subSubCategory:string | undefined;
    city: string | undefined;
    lots: LotTypes[]
    total: number
}

export default function Catalog({category, subCategory, subSubCategory, city, lots, total}:CatalogProps) {
  return (
    <div className='flex flex-col justify-start items-start w-full mt-2 min-h-200'>
        <h1 className='text-md text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        <h1 className='text-black text-2xl'>Результаты по поиску <span className='text-orange-600'>{`Кродил 50`.toUpperCase()}</span></h1>
        <span className='text-gray-500 text-sm'>Найдено лотов: {total}</span>
        <div className='flex flex-col justify-start items-start gap-2 w-full mt-2'>
          {lots.map(l => (
            <LotCardV2 lot={l}/>
          ))}
          <div className='w-full'>
            <Pagination />
          </div>
        </div>
    </div>
  )
}