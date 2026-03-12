'use client'

import { Sliders } from "lucide-react"; 
import { useState } from "react";
import InputField from "../utils/inputFields";
import SelectionField from "../utils/selectionField";
import { useTranslation } from "@/app/context/TranslationProvider";
import listLocation from '../../data/citiesUK.json'
import { hover } from "@/styles/style";

export default function Filter() {
  const {t} = useTranslation()
  const [open, setOpen] = useState(true)
  const [city, setCity] = useState('')
  const [sort, setSort] = useState(t('catalog', 'LowToUp'))
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const listLowToUpPrice = [
    {name: t('catalog', 'LowToUp')},
    {name: t('catalog', 'UpToLow')},
  ]


  return (
    <div className={`${open && 'w-90'} flex flex-col bg-white justify-start items-start h-full p-5 gap-4`}>
      <div className={`flex justify-between items-center w-full`}>
        {open && (
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black text-lg">{t('catalog','Filter')}</h1>
            <span className={`text-sm text-orange-600 ${hover}`}>{t('catalog', 'resetFilter')}</span>
          </div>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
      <SelectionField title={t('catalog', 'FilterByCity')} placeholder={t('catalog', 'SelectCity')} list={listLocation} value={city} setValue={setCity}/>
      <SelectionField title={t('catalog', 'sort')} placeholder={t('catalog', 'LowToUp')} list={listLowToUpPrice} value={sort} setValue={setSort}/>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center gap-2 w-full">
          <InputField label={t('catalog', 'from')} type="number" onChange={setMinPrice} value={minPrice}/>
          <InputField label={t('catalog', 'to')} type="number" onChange={setMinPrice} value={minPrice}/>
        </div>
        <input 
        type="range"  
        min="0" 
        max="100" 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full bg-gray-100 border-none appearance-none rounded-xl p-1"
        />
      </div>
    </div>
  )
}

