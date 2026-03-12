import React from 'react'

interface CatalogProps {
    category:string,
    subCategory:string,
    subSubCategory:string,
    city: string
}

export default function Catalog() {
  return (
    <div className='flex flex-col justify-center items-start w-full'>
        <h1 className='text-md text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        <h1 className='text-black text-2xl'>Результаты по поиску <span className='text-orange-600'>КРОКОДИЛ 50</span></h1>
        <span className='text-gray-500'>Найдено лотов: 1</span>
    </div>
  )
}