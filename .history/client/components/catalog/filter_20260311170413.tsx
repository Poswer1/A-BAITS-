'use client'

import { Sliders } from "lucide-react"; 
import { useState } from "react";
import InputField from "../utils/inputFields";
import SelectionField from "../utils/selectionField";
import { useTranslation } from "@/app/context/TranslationProvider";
import listLocation from '../../data/citiesUK.json'

export default function Filter() {

  const [open, setOpen] = useState(true)
  const [city, setCity] = useState('')
  const {t} = useTranslation()

  return (
    <div className={`${open && 'w-90'} flex flex-col bg-white justify-start items-start h-full p-5`}>
      <div className={`flex justify-between items-center w-full`}>
        {open && (
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black text-lg">Фильтры</h1>
            <span className="text-sm text-orange-600">{t('catalog', 'resetFilter')}</span>
          </div>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
      <SelectionField title={t('catalog', 'FilterByCity')} placeholder={t('catalog', 'SelectCity')} list={listLocation} value={city} setValue={setCity}/>
    </div>
  )
}

