import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"

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
    <div className={`${block} !p-0`}>
        <div className={`${block} flex-row !justify-start gap-10`}>
          <div className={`${Blockinput} !w-1/4`}>
            <span className={nameInput}>{t('createLot','createLot-StartingPrice')} ₴</span>
              <input type='number' min={1} placeholder={t('createLot','createLot-StartingPrice')} className={`${input} border border-gray-400`} value={`${Number(price)}`} onChange={(e) => setPrice(Number(e.target.value))}/>
          </div>
          <div className={`${Blockinput} !w-1/4`}>
              <span className={nameInput}>{t('createLot','createLot-step')} ₴</span>
              <input type='number' min={1} placeholder={t('createLot','createLot-step')} className={`${input} border border-gray-400`} value={`${Number(priceStep)}`} onChange={(e) => setPriceStep(Number(e.target.value))}/>
          </div>
        </div>
        <div className={`${block} flex-row !justify-start gap-10`}>
          <div className={`${Blockinput} !w-1/4`}>
            <span className={nameInput}>{t('createLot','createLot-Blitz')} ₴ ( {t('global','NotNecessary')} )</span>
            <span className={nameInput}>{t('createLot','createLot-Blitz-descriptions')}</span>
            <input type='number' min={1} placeholder={t('createLot','createLot-Blitz-descriptions')} className={`${input} border border-gray-400`} value={`${Number(blitzPrice)}`} onChange={(e) => setBlitzPrice(Number(e.target.value))}/>
          </div>
          <div className={`${Blockinput} !w-1/4`}>
              <span className={nameInput}>{t('createLot','createLot-ReservePrice')} ₴ ( {t('global','NotNecessary')} )</span>
              <span className={nameInput}>{t('createLot',"createLot-ReservePrice-descriptions")}</span>
              <input type='number' min={1} placeholder={t('createLot','createLot-ReservePrice-descriptions')} className={`${input} border border-gray-400`} value={`${Number(reservPrice)}`} onChange={(e) => setReservPrice(Number(e.target.value))}/>
              <span className="text-orange-600 font-bold text-xs">{t('global','PaidFeature')}</span>
          </div>
        </div>
      </div>
  )
}


