'use client'

import { LotTypes } from '@/types/types';
import Pagination from '../ui/pagination';
import { useTranslation } from '@/app/context/TranslationProvider';
import MobileVersion from '../card/mobileVersion';
import { LayoutGrid, Rows3, X } from 'lucide-react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import listLocation from '../../data/citiesUK.json';
import { useState } from 'react';

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
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const lang = params.lang as string

  const [stateCard, setStateCard] = useState('')

  const activeFilters = [
    city ? {key: 'city', label: city} : null,
    searchParams.get('minPrice') ? {key: 'minPrice', label: `${t('catalog', 'from')} ${searchParams.get('minPrice')} ₴`} : null,
    searchParams.get('maxPrice') ? {key: 'maxPrice', label: `${t('catalog', 'to')} ${searchParams.get('maxPrice')} ₴`} : null,
    searchParams.getAll('state').map(value => ({key: `state:${value}`, label: getStateLabel(value)})),
    searchParams.get('sort') ? {key: 'sort', label: getSortLabel(searchParams.get('sort') || '')} : null,
  ].flat().filter(Boolean) as {key: string; label: string}[]

  function getStateLabel(value: string) {
    const labels: Record<string, string> = {
      new: t('catalog', 'state-new'),
      used: 'Б/У',
      needsRepairs: t('catalog', 'state-needsRepairs'),
      forSpare: t('catalog', 'state-forSpare'),
    }
    return labels[value] || value
  }

  function getSortLabel(value: string) {
    const labels: Record<string, string> = {
      LowToUp: lang === 'ru' ? 'Цена по возрастанию' : 'Ціна за зростанням',
      UpToLow: lang === 'ru' ? 'Цена по убыванию' : 'Ціна за спаданням',
      newFirst: lang === 'ru' ? 'Сначала новые' : 'Спочатку нові',
      oldFirst: lang === 'ru' ? 'Сначала заканчивающиеся' : 'Спочатку ті, що закінчуються',
      moreBids: lang === 'ru' ? 'Больше ставок' : 'Більше ставок',
      lessBids: lang === 'ru' ? 'Меньше ставок' : 'Менше ставок',
    }
    return labels[value] || value
  }

  const removeFilter = (key: string) => {
    if (key === 'city') {
      const parts = pathname.split('/').filter(Boolean)
      const cityIndex = parts.findIndex(part => listLocation.some(item => item.name.toLowerCase() === part.toLowerCase()))
      if (cityIndex !== -1) parts.splice(cityIndex, 1)
      router.push(`/${parts.join('/')}${searchParams.toString() ? `?${searchParams}` : ''}`)
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    if (key.startsWith('state:')) {
      nextParams.delete('state')
      searchParams.getAll('state').filter(value => `state:${value}` !== key).forEach(value => nextParams.append('state', value))
    } else {
      nextParams.delete(key)
    }
    router.push(`${pathname}${nextParams.toString() ? `?${nextParams}` : ''}`)
  }

  return (
    <div className='flex flex-col md:p-2 justify-start items-start w-full  md:min-h-200 overflow-x-hidden p-2'>
        <h1 className='text-md text-gray-500 '>{category && `${category} |`} {subCategory && `${subCategory} |`} {subSubCategory && `${subSubCategory} |`} {city && `${city}`}</h1>
        {searchValue && (
          <h1 className="text-black text-xl md:text-2xl">
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
        <span className='text-gray-500 text-sm'>Найдено лотов: {total}</span>
        {activeFilters.length > 0 && (
          <div className="flex w-full overflow-x-auto items-center gap-2">
            {activeFilters.map(filter => (
                <button
                    key={filter.key}
                    type="button"
                    onClick={() => removeFilter(filter.key)}
                    className="flex items-center gap-1 rounded-md bg-orange-600/10 p-2 text-sm text-orange-600 hover:bg-orange-600/20 shrink-0"
                >
                    {filter.label}
                    <X size={18}/>
                </button>
            ))}
        </div>
        )}
        <div className='flex flex-col justify-start items-start w-full mt-2'>
          <div className='flex justify-start items-center w-full text-black gap-2'>
            <span className='flex justify-center items-center p-2 bg-white rounded-md'>
              <LayoutGrid size={18}/>
            </span>
            <span className='flex justify-center items-center p-2 bg-white rounded-md'>
              <Rows3 size={18}/>
            </span>
          </div>
          <MobileVersion lots={lots}/>
          <div className={`w-full`}>
            <Pagination total={total} maxLot={25}/>
          </div>
        </div>
    </div>
  )
}