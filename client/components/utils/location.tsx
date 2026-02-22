
import { animationOpacity, hover } from "@/styles/style"
import cities from '@/data/citiesUK.json'
import { customInput, input, overlay } from "@/styles/global"
import { Search } from "lucide-react"
import { useState, useTransition } from "react"
import { useTranslation } from "@/app/context/TranslationProvider"

interface LocationProps {
    setLocation:(value:string) => void,
    setOpenSelectLocation:(value:boolean) => void,
}

export default function LocationList({ setLocation, setOpenSelectLocation}: LocationProps) {

    const [value, setValue] = useState('')
    const {t} = useTranslation()

    const fillterCities = cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))

  return (
    <div className={overlay} onClick={() => setOpenSelectLocation(false)}>
        <div className={`bg-white flex flex-col justify-start items-start ${animationOpacity} p-5 rounded-md w-150`} onClick={(e) => e.stopPropagation()}>
            <div className={`${customInput} mb-2`}>
                <Search className="text-gray-500"/>
                <input placeholder={t('profile', 'enterCity')} className={`${input}`} value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className="flex flex-col justify-start items-start overflow-auto min-h-80 max-h-80 w-full custom-scrollbar gap-2">
                {fillterCities.length === 0 && (
                    <span>{t('profile', 'cityNotFound')}</span>
                )}
                {fillterCities.map((city, index) => (
                    <span className={hover} onClick={() => {setLocation(city.name), setOpenSelectLocation(false)}}>{city.name}</span>
                ))}
            </div>
        </div>
    </div>
  )
}
