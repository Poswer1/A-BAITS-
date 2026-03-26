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
      { name: 1, ru: '1 день', uk: '1 день' },
      { name: 2, ru: '2 дня', uk: '2 дні' },
      { name: 3, ru: '3 дня', uk: '3 дні' },
      { name: 4, ru: '4 дня', uk: '4 дні' },
      { name: 5, ru: '5 дней', uk: '5 днів' },
      { name: 6, ru: '6 дней', uk: '6 днів' },
      { name: 7, ru: '7 дней', uk: '7 днів' },
      { name: 8, ru: '8 дней', uk: '8 днів' },
      { name: 9, ru: '9 дней', uk: '9 днів' },
      { name: 10, ru: '10 дней', uk: '10 днів' },
    ]

  return (
    <div className={`${block}`}>
        <div className={`${Blockinput} md:!flex-row gap-5`}>
          <SelectionField 
            placeholder={t('createLot','createLot-Date')} 
            title={t('createLot','createLot-Date')} 
            value={date} 
            setValue={setDate} 
            list={listSelectDay}
          />
          <div className="hidden md:flex w-full">
            <InputField label={t('createLot','createLot-DateTime')} value={time} onChange={setTime} type="time" placeholder={t('createLot','createLot-DateTime')}/>
          </div>
          <div className="flex flex-col w-full gap-1 md:hidden">
            <input type="time" id="timeInput" className="absolute opacity-0 w-0 h-0 md:hidden" value={time} onChange={(e) => setTime(e.target.value)}/>
            <span>{t('createLot','createLot-DateTime')}</span>
            <label htmlFor="timeInput" className="flex justify-between items-center rounded-lg w-full gap-2 p-2 bg-gray-100 md:hidden">
              <div className="flex gap-2">
                <span>{time || t('createLot', 'createLot-DateTime')}</span>
              </div>
              <ChevronDown />
            </label>
          </div>
        </div>
      </div>
  )
}
