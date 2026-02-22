import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"

interface DateSectionsProps {
    date:number,
    setDate: (t:number) => void,
    time:number,
    setTime: (t:number) => void,
}

export default function DateSections({date, setDate, time, setTime}: DateSectionsProps) {

    const {t} = useTranslation() 

  return (
    <div className={`${block} flex-row !justify-start gap-10`}>
        <div className={`${Blockinput} !w-1/4`}>
          <span className={nameInput}>{t('createLot','createLot-Date')}</span>
          <input type='number' max={7} min={1} placeholder={t('createLot','createLot-ReservePrice-descriptions')} className={`${input} border border-gray-400 `} value={`${Number(date)}`}  onChange={(e) => {
            let value = Number(e.target.value);
            setDate(value);
          }}/>
          <span className={nameInput}>{t('createLot','createLot-Date-descriptions')}</span>
        </div>
        <div className={`${Blockinput} !w-1/4`}>
          <span className={nameInput}>{t('createLot','createLot-DateTime')} ( по Kyiv ) </span>
          <input type="time" step={60} placeholder={t('createLot','createLot-DateTime')} className={`${input} border border-gray-400 `} value={time} onChange={(e) => setTime(e.target.value)}/>
          <span className={nameInput}>{t('createLot','createLot-DateTime-descriptions')}</span>
        </div>
      </div>
  )
}
