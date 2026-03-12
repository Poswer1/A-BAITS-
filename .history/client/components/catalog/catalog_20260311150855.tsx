import React from 'react'

interface CatalogProps {
    category:string | undefined;
    subCategory:string | undefined;
    subSubCategory:string | undefined;
    city: string | undefined;
}

export default function Catalog({category, subCategory, subSubCategory, city}:CatalogProps) {
  return (
    <div className='flex flex-col justify-center items-start w-full mt-2'>
        <h1 className='text-md text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        <h1 className='text-black text-2xl'>Результаты по поиску <span className='text-orange-600'>Кродил 50</span></h1>
        <span className='text-gray-500'>Найдено лотов: 1</span>
    </div>
  )
}