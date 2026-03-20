import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput,selectBlock } from "@/styles/createLot"
import { arrowActive, hover } from "@/styles/style"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import LocationList from "../ui/location"
import SelectionField from "../ui/selectionField"

interface LocationSections {
  location:string,
  setLocation:(value:string) => void
}

export default function LocationSections({location, setLocation}: LocationSections) {

    const [openSelectLocation,setOpenSelectLocation] = useState(false)

    const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
      <SelectionField 
      title={t('createLot','createLot-locationTitle')} 
      placeholder={t('createLot','createLot-locationTitle')}
      setValue={setLocation}
      value={location}
      list={}
      />
      <div className={`${Blockinput}`}>
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

