import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import InputField from "../ui/inputFields";

interface DateSectionsProps {
    date:number,
    setDate: (t:number) => void,
    time:number,
    setTime: (t:number) => void,
}

export default function DateSections({date, setDate, time, setTime}: DateSectionsProps) {

    const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
        <div className={`${Blockinput} md:!flex-row gap-5`}>
          <InputField label={t('createLot','createLot-Date')} value={date} onChange={setDate} type="number" placeholder={t('createLot','createLot-ReservePrice-descriptions')}/>
          <InputField label={t('createLot','createLot-DateTime')} value={time} onChange={setTime} type="time" placeholder={t('createLot','createLot-DateTime')}/>
        </div>
      </div>
  )
}
