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
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Filter() {
  const {t} = useTranslation()
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const path = usePathname()

  const [open, setOpen] = useState(true)
  const [city, setCity] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [sort, setSort] = useState(t('catalog', 'LowToUp'))
  const [sortValue, setSortValue] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [state, setState] = useState<string[]>([])

  const listLowToUpPrice = [
    {name: 'LowToUp', ru:'От дешевого к дорогому', uk: 'Від дешевого до дорогого'},
    {name: 'UpToLow', ru:'От дорогого к дешовому', uk: 'Від дорогого до дешевого'},
  ]

  const stateList = [
    {name: 'new', lang: t('catalog', 'state-new')},
    {name: 'used', lang: 'Б/У'},
    {name: 'needsRepairs', lang: t('catalog', 'state-needsRepairs')},
    {name: 'forSpare', lang: t('catalog', 'state-forSpare')}
  ]

  const handleAddStateToList = (state:string) => {
      setState(prev => prev.includes(state)
      ? prev.filter(s => s !== state)
      : [...prev, state]
    )
  }

  useEffect(() => {
    if(!cityValue) return

    const cityExists = listLocation.find(c => c.name === cityValue)
    if(!cityExists) return

    const parts = path.split('/').filter(Boolean) // удаляет все ложные значения по типу - false, 0, '', null, undefined, NaN

    const cityIndex = parts.findIndex(part =>
      listLocation.some(c => 
        c.name.toLowerCase() === part.toLowerCase()
      )
    )

    parts.splice(cityIndex, 1) // первое индекс того что удаляем // второе это сколько

    parts.push(cityValue)
    
    router.push(`${path}/${parts.join('/')}`)

  }, [cityValue])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if(sortValue) {
      params.set('sort', sortValue)
    } else {
      params.delete('sort')
    }

    params.delete('state')
    state.forEach(s => {
      params.append('state', s.toString())
    })
      
    router.push(`?${params.toString()}`)

  },[state, sort])

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams)
    if(minPrice !== null && minPrice !== 0) {
      params.set('minPrice', minPrice.toString())
    } else {
      params.delete('minPrice')
    }
    
    if(maxPrice !== null && maxPrice !== 0) {
      params.set('maxPrice', maxPrice.toString())
    } else {
      params.delete('maxPrice')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className={`${open ? 'w-100' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col bg-white justify-start items-start h-screen p-5 gap-4 border-r border-gray-300`}>
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
          <SelectionField title={t('catalog', 'FilterByCity')} placeholder={t('catalog', 'SelectCity')} list={listLocation} valueLang={city} setValue={setCityValue}  setValueLang={setCity}/>
          <SelectionField title={t('catalog', 'sort')} placeholder={t('catalog', 'LowToUp')} list={listLowToUpPrice} valueLang={sort} setValue={setSortValue} setValueLang={setSort}/>
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
            <button className={`${button} w-full`} onClick={handleApplyPrice}>{t('catalog', 'Apply')}</button>
          </div>

          <div className="flex flex-col justify-center items-start gap-2 mt-2">
            <span>{t('catalog', 'state')}</span>
            <div className="flex flex-wrap justify-start items-center w-full gap-2">
              {stateList.map((s, index) => (
                <span key={index} onClick={() => handleAddStateToList(s.name)} className={`${hoverCat} ${state.includes(s.name) && 'bg-orange-600/10 text-orange-600'} py-1 px-2 rounded-md bg-gray-100`}>{s.lang}</span>
              ))}
            </div>
          </div>
        </div>
      
    </div>
  )
}

