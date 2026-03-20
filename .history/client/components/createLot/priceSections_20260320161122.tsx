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
    <div className={`${block} gap-5`}>
      <div className={`${Blockinput} !flex-row gap-5`}>
        <InputField 
        type="number"
         value={price}
        onChange={setPrice} 
        label={`${t('createLot','createLot-StartingPrice')} ₴`} 
        placeholder={t('createLot','createLot-StartingPrice')}/>
        
        <InputField 
        type="number" 
        value={priceStep} 
        onChange={setPriceStep} 
        label={`${t('createLot','createLot-step')} ₴`} 
        placeholder={t('createLot','createLot-step')}/>

        <InputField 
        type="number" 
        value={blitzPrice} 
        onChange={setBlitzPrice} 
        label={`${t('createLot','createLot-Blitz')} ₴ (${t('global','NotNecessary')})`} 
        placeholder={t('createLot','createLot-Blitz-descriptions')}/>
      </div>
      </div>
  )
}


