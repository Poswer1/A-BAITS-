import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import InputField from "../ui/inputFields";
import { ChevronDown, ChevronRight, Clock, Timer, TimerIcon } from "lucide-react";

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
          <div className="hidden md:flex w-full">
            <InputField label={t('createLot','createLot-DateTime')} value={time} onChange={setTime} type="time" placeholder={t('createLot','createLot-DateTime')}/>
          </div>
          <div className="flex justify-between items-center rounded-lg w-full gap-2 p-2 bg-gray-100">
            <div>
                        <Clock />
            <span>{t('createLot', 'createLot-DateTime')}</span>
            </div>
            <ChevronDown />
          </div>
        </div>
      </div>
  )
}
