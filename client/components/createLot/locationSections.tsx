import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput } from "@/styles/createLot"
import LocationList from '../../data/citiesUK.json'
import SelectionField from "../ui/selectionField"

interface LocationSections {
  location:string,
  setLocation:(value:string) => void
  locationError?: string
}

export default function LocationSections({location, setLocation, locationError}: LocationSections) {

  const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
      <div className={`${Blockinput} !w-full md:!w-1/3`}>
          <SelectionField 
          title={t('createLot','createLot-locationTitle')} 
          placeholder={t('createLot','createLot-locationTitle')}
          setValue={setLocation}
          value={location}
          list={LocationList}
          error={locationError}
          />
      </div>
  </div>
  )
}

