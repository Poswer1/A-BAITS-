'use client'

import { Sliders } from "lucide-react"; 
import { useState } from "react";
import InputField from "../utils/inputFields";
import SelectionField from "../utils/selectionField";
import { useTranslation } from "@/app/context/TranslationProvider";
import listLocation from '../../data/citiesUK.json'
import { hover } from "@/styles/style";
import { button } from "@/styles/global";
import { hoverCat } from "@/styles/categoryList";


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

  const stateList = [
    {name: t('catalog', 'state-new')},
    {name: 'Б/У'},
    {name: t('catalog', 'state-needsRepairs')},
    {name: t('catalog', 'state-forSpare')}
  ]

  return (
    <div className={`${open && 'w-100'} flex flex-col bg-white justify-start items-start h-full p-5 gap-4`}>
      <div className={`flex justify-between items-center w-full`}>
        {open && (
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black text-lg">{t('catalog','Filter')}</h1>
            <span className={`text-sm text-orange-600 ${hover}`}>{t('catalog', 'resetFilter')}</span>
          </div>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
      {open && (
        <>
        
        </>
      )}
    </div>
  )
}

