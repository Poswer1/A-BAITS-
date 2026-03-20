import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput,selectBlock } from "@/styles/createLot"
import { arrowActive, hover } from "@/styles/style"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import LocationList from '../../data/citiesUK.json'
import SelectionField from "../ui/selectionField"

interface LocationSections {
  location:string,
  setLocation:(value:string) => void
}

export default function LocationSections({location, setLocation}: LocationSections) {

  const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
      <div className={`${Blockinput} !w-1/3`}>
          <SelectionField 
          title={t('createLot','createLot-locationTitle')} 
          placeholder={t('createLot','createLot-locationTitle')}
          setValue={setLocation}
          value={location}
          list={LocationList}/>
      </div>
  </div>
  )
}

