import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import InputField from "../ui/inputFields"

interface PriceSectionsProps {
    price:number,
    setPrice: (type:number) => void
    priceStep:number,
    setPriceStep: (type:number) => void
    blitzPrice:number,
    setBlitzPrice: (type:number) => void,
    mode: 'create' | 'edit', 
}

export default function PriceSections({price, setPrice, priceStep, setPriceStep, blitzPrice, setBlitzPrice, mode}: PriceSectionsProps) {

    const {t} = useTranslation()

  return (
    <div className={`${block} gap-5`}>
        <div className="flex w-full flex-wrap gap-5">
          <div className={`${Blockinput} md:!w-2/6 2xl:!w-1/4`}>
              {mode === 'create' && (
             <InputField 
              type="number" 
              value={price} 
              onChange={setPrice} 
              label={`${t('createLot','createLot-StartingPrice')} ₴`}
              placeholder={t('createLot','createLot-StartingPrice')}/>
              )}
            </div>
            <div className={`${Blockinput} md:!w-2/6 2xl:!w-1/4`}>
                <InputField 
                type="number" 
                value={priceStep} 
                onChange={setPriceStep} 
                label={`${t('createLot','createLot-step')} ₴`} 
                placeholder={t('createLot','createLot-step')}/>
            </div>
        </div>
          <div className={`${Blockinput} md:!w-2/6 2xl:!w-1/4`}>
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


