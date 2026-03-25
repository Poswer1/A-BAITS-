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

    const listSelectDay = [
      {name: 1,},
      {name: 2},
      {name: 3},
      {name: 4},
      {name: 5},
      {name: 6},
      {name: 7},
      {name: 8},
      {name: 9},
      {name: 10},
]

  return (
    <div className={`${block}`}>
        <div className={`${Blockinput} md:!flex-row gap-5`}>
          <SelectionField placeholder={t('createLot','createLot-Date')} title={t('createLot','createLot-Date')} value={date} setValue={setDate} list={listSelectDay}/>
          <div className="hidden md:flex w-full">
            <InputField label={t('createLot','createLot-DateTime')} value={time} onChange={setTime} type="time" placeholder={t('createLot','createLot-DateTime')}/>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span>Время окончания</span>
            <label htmlFor="timeInput" className="flex justify-between items-center rounded-lg w-full gap-2 p-2 bg-gray-100 md:hidden">
              <div className="flex gap-2">
                <Clock />
                <span>{time || t('createLot', 'createLot-DateTime')}</span>
              </div>
              <ChevronDown />
            </label>
          </div>
        </div>
      </div>
  )
}
