import React from 'react'
import LotCardV2 from '../lotCardV2';
import { LotTypes } from '@/types/types';

interface CatalogProps {
    category:string | undefined;
    subCategory:string | undefined;
    subSubCategory:string | undefined;
    city: string | undefined;
    lots: LotTypes[]
}

export default function Catalog({category, subCategory, subSubCategory, city, lots}:CatalogProps) {
  return (
    <div className='flex flex-col justify-center items-start w-full mt-2'>
        <h1 className='text-md text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        <h1 className='text-black text-2xl'>Результаты по поиску <span className='text-orange-600'>{`Кродил 50`.toUpperCase()}</span></h1>
        <span className='text-gray-500'>Найдено лотов: 1</span>
        {lots.map(l => (
           <LotCardV2 lot={l}/>
        ))}
    </div>
  )
}