import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import InputField from "../ui/inputFields"

interface PriceSectionsProps {
    price:Number,
    setPrice: (type:number) => void
    priceStep:Number,
    setPriceStep: (type:number) => void
    blitzPrice:Number,
    setBlitzPrice: (type:number) => void,
    reservPrice:Number,
    setReservPrice: (type:number) => void,
}

export default function PriceSections({price, setPrice, priceStep, setPriceStep, blitzPrice, setBlitzPrice, reservPrice, setReservPrice}: PriceSectionsProps) {

    const {t} = useTranslation()

  return (
    <div className={`${block}`}>
        <div className={`${block} flex-row !justify-start gap-10 !p-0`}>
          <div className={`${Blockinput} !w-1/4`}>
            <InputField type="number" value={price} onChange={setPrice} label={`${t('createLot','createLot-StartingPrice')} ₴`} placeholder={t('createLot','createLot-StartingPrice')}/>
          </div>
          <div className={`${Blockinput} !w-1/4`}>
              <InputField type="number" value={priceStep} onChange={setPriceStep} label={`${t('createLot','createLot-step')} ₴`} placeholder={t('createLot','createLot-step')}/>
          </div>
        </div>
        <div className={`${block} flex-row !justify-start gap-10 !p-0`}>
          <div className={`${Blockinput} !w-1/4`}>
            <InputField type="number" value={priceStep} onChange={setPriceStep} label={`${t('createLot','createLot-Blitz')} ₴ ( {t('global','NotNecessary')} )`} placeholder={t('createLot','createLot-step')}/>
            <span className={nameInput}>{t('createLot','createLot-Blitz')} ₴ ( {t('global','NotNecessary')} )</span>
            <span className={nameInput}>{t('createLot','createLot-Blitz-descriptions')}</span>
            <input type='number' min={1} placeholder={t('createLot','createLot-Blitz-descriptions')} className={`${input} border border-gray-400`} value={`${Number(blitzPrice)}`} onChange={(e) => setBlitzPrice(Number(e.target.value))}/>
          </div>
        </div>
      </div>
  )
}


