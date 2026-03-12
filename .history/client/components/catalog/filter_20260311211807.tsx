'use client'

import { Sliders } from "lucide-react"; 
import { useEffect, useState } from "react";
import InputField from "../utils/inputFields";
import SelectionField from "../utils/selectionField";
import { useTranslation } from "@/app/context/TranslationProvider";
import listLocation from '../../data/citiesUK.json'
import { hover } from "@/styles/style";
import { button } from "@/styles/global";
import { hoverCat } from "@/styles/categoryList";
import { useParams, useRouter, useSearchParams } from "next/navigation";


export default function Filter() {
  const {t} = useTranslation()
  const searchParams = useSearchParams()
  const params = useParams()
  const lang = params.lang as string
  const router = useRouter()

  const [open, setOpen] = useState(true)
  const [city, setCity] = useState('')
  const [sort, setSort] = useState(t('catalog', 'LowToUp'))
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [state, setState] = useState<string[]>([])

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

  const handleAddStateToList = (state:string) => {
      setState(prev => prev.includes(state)
      ? prev.filter(s => s !== state)
      : [...prev, state]
    )
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.delete('minPrice')
    params.append('minPrice', minPrice.toString())
    
    params.delete('maxPrice')
    params.append('maxPrice', maxPrice.toString())

    params.delete('state')
    params.set
      
    router.push(`?${params.toString()}`)

  },[minPrice])

  return (
    <div className={`${open ? 'w-100' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col bg-white justify-start items-start h-full p-5 gap-4`}>
      <div className={`flex ${open ? 'justify-between' : 'justify-center'} items-center w-full`}>
        {open && (
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black text-lg">{t('catalog','Filter')}</h1>
            <span className={`text-sm text-orange-600 ${hover}`}>{t('catalog', 'resetFilter')}</span>
          </div>
        )}
        <Sliders className='text-orange-600 cursor-pointer' size={25} onClick={() => setOpen(prev => !prev)}/>
      </div>
      
        <div className={`${open ? 'opacity-100 duration-1000' : 'opacity-0 duration-100'}`}>
          <SelectionField title={t('catalog', 'FilterByCity')} placeholder={t('catalog', 'SelectCity')} list={listLocation} value={city} setValue={setCity}/>
          <SelectionField title={t('catalog', 'sort')} placeholder={t('catalog', 'LowToUp')} list={listLowToUpPrice} value={sort} setValue={setSort}/>
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <div className="flex justify-center items-center gap-2 w-full">
              <InputField label={t('catalog', 'from')} type="number" onChange={setMinPrice} value={minPrice}/>
              <InputField label={t('catalog', 'to')} type="number" onChange={setMaxPrice} value={maxPrice}/>
            </div>
            <input 
            type="range"  
            min="0" 
            max="10000" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full bg-gray-200 border-none appearance-none accent-orange-600 rounded-xl h-2 slider my-2"
            />
            <button className={`${button} w-full`}>{t('catalog', 'Apply')}</button>
          </div>

          <div className="flex flex-col justify-center items-start gap-2">
            <span>{t('catalog', 'state')}</span>
            <div className="flex flex-wrap justify-start items-center w-full gap-2">
              {stateList.map((s, index) => (
                <span key={index} onClick={() => handleAddStateToList(s.name)} className={`${hoverCat} ${state.includes(s.name) && 'bg-orange-600/10 text-orange-600'} py-1 px-2 rounded-md bg-gray-100`}>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
      
    </div>
  )
}

