
import LotCardV2 from '../lotCardV2';
import { LotTypes } from '@/types/types';
import Pagination from '../ui/pagination';

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
  
  return (
    <div className='flex flex-col p-2 justify-start items-start w-full mt-2 md:min-h-200'>
        <h1 className='text-md text-gray-500'>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        {searchValue && (
          <h1 className='text-black text-xl md:text-2xl'>Результаты по поиску <span className='text-orange-600'>{`${searchValue.length >= 30 ? searchValue.slice(0, 30) + '...' : searchValue}`.toUpperCase()}</span></h1>
        )}
        <span className='text-gray-500 text-sm'>Найдено лотов: {total}</span>
        <div className='flex flex-col justify-start items-start  w-full mt-2'>
          {lots.map(l => (
            <LotCardV2 lot={l}/>
          ))}
          <div className={`w-full`}>
            <Pagination total={total} maxLot={10}/>
          </div>
        </div>
    </div>
  )
}