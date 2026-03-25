import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import InputField from "../ui/inputFields";
import { ChevronDown, Clock,  TimerIcon } from "lucide-react";
import SelectionField from "../ui/selectionField";

interface DateSectionsProps {
    date:number,
    setDate: (t:number) => void,
    time:string,
    setTime: (t:string) => void,
}

export default function DateSections({date, setDate, time, setTime}: DateSectionsProps) {

    const {t} = useTranslation() 

  return (
    <div className={`${block}`}>
        <div className={`${Blockinput} md:!flex-row gap-5`}>
          <InputField label={t('createLot','createLot-Date')} value={date} onChange={setDate} type="number" placeholder={t('createLot','createLot-ReservePrice-descriptions')}/>
          <SelectionField title={t('createLot','createLot-Date')}/>
          <div className="hidden md:flex w-full">
            <InputField label={t('createLot','createLot-DateTime')} value={time} onChange={setTime} type="time" placeholder={t('createLot','createLot-DateTime')}/>
          </div>
          <input type="time" id="timeInput" className="absolute opacity-0 w-0 h-0" value={time} onChange={(e) => setTime(e.target.value)}/>
          <label htmlFor="timeInput" className="flex justify-between items-center rounded-lg w-full gap-2 p-2 bg-gray-100">
            <div className="flex gap-2">
              <Clock />
              <span>{t('createLot', 'createLot-DateTime')}</span>
            </div>
            <ChevronDown />
          </label>
        </div>
      </div>
  )
}
