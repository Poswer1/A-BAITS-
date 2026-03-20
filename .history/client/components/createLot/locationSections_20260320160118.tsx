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
      <SelectionField list={LocationList} />
  </div>
  )
}

