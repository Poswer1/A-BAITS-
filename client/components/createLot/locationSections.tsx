import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput,selectBlock } from "@/styles/createLot"
import { arrowActive, hover } from "@/styles/style"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import LocationList from "../utils/location"

interface LocationSections {
  location:string,
  setLocation:(value:string) => void
}

export default function LocationSections({location, setLocation}: LocationSections) {

    const [openSelectLocation,setOpenSelectLocation] = useState(false)

    const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
      <div className={`${Blockinput} relative`}>
        <span className={nameInput}>{t('createLot','createLot-locationTitle')}</span>
        <div className={`${hover} ${selectBlock}`} onClick={() => setOpenSelectLocation(prev => !prev)}>
          {location || t('createLot','createLot-locationTitle')}
          <ChevronDown className={arrowActive(openSelectLocation)}/>
        </div>
        {openSelectLocation && (
          <LocationList setLocation={setLocation} setOpenSelectLocation={setOpenSelectLocation}/>
        )}
      </div>
  </div>
  )
}

