
import { BASE_URL } from "@/services/utils"
import { useTranslation } from "@/app/context/TranslationProvider"
import { button, customInput } from "@/styles/global"
import { columnBlock} from "@/styles/lot"
import { animationOpacity, hover } from "@/styles/style"
import { Plus, Minus } from "lucide-react"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface InfoSectionProps {
    lot:any,
    socket: Socket,
    currentPrice: number,
    setCurrentPrice: (t:number) => void
    value:number,
    setValue: React.Dispatch<React.SetStateAction<Number>>
}

export default function InfoSection({lot, socket, currentPrice, setCurrentPrice, value, setValue}: InfoSectionProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')

    const handleBid = () => {
        socket.emit('placeBid',
        {
            lotId: lot.lotNumber, 
            bid: value
        })
    }

    const handlePlus = () => setValue((prev:any) => prev + lot.stepPrice)

    const handleMinus = () => {
        setValue((prev:any) => {
        if (prev - lot.stepPrice < (currentPrice + lot.stepPrice)) {
        setMessage(`${t('lot', 'lot-lowStep')} ${(currentPrice + lot.stepPrice)} ₴`);
        setTimeout(() => {
            setMessage('')
        }, 5000)
        return prev; 
        }
        return prev - lot.stepPrice;
    }); 
    }
    
    if(!lot) return
    
    const buttonInput = 'bg-gray-200 flex justify-center items-center text-black rounded-md'

  return ( 
    <div className={`${columnBlock}`}>
      <h1 className="font-bold">{t('lot','lot-currentPrice')}<br/><span className="text-3xl">{currentPrice} ₴</span></h1>
      <span className="text-base text-orange-600">{t('lot', 'lot-dateStop')} через <span>{lot.date} {t('lot', 'lot-day')} в {lot.dateTime} ( по Kyiv )</span></span>
            
        <div className={`${customInput} py-2`}>
            <span className="font-bold">₴</span>
            <input placeholder="950" className="w-full outline-none" value={value}/>
            <div className="flex justify-center items-center gap-2">
                <Minus className={`${buttonInput} ${hover}`} onClick={handleMinus}/>
                <Plus className={`${buttonInput} ${hover}`} onClick={handlePlus}/>
            </div>
        </div> 

        {message && (
            <p className={`${animationOpacity} text-orange-600 mt-2`}>{message}</p>
        )}

        <button onClick={handleBid} className={`${button} w-full ${hover} text-lg`}>{t('lot', 'lot-doBid')}</button>
        <button className={`w-full ${hover} text-black border-orange-600 border !text-orange-600 rounded-md p-2 text-lg`}>
            {t('lot', 'lot-buyNow')} <span className="font-bold">( {lot.blitzPrice} ₴ )</span>
        </button>
    </div>
  )
}


