
import { BASE_URL } from "@/services/utils"
import { useTranslation } from "@/app/context/TranslationProvider"
import { animate, button, customInput } from "@/styles/global"
import { columnBlock} from "@/styles/lot"
import { animationOpacity, hover } from "@/styles/style"
import { Plus, Minus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { buyNow } from "@/services/payment"
import { LotTypes } from "@/types/types"
import Countdown from "../ui/countdown"

interface InfoSectionProps {
    lot: LotTypes,
    socket: Socket,
    currentPrice: number,
    setStatus: (t:string) => void
    status:string
    setCurrentPrice: (t:number) => void
    value:number,
    setValue: React.Dispatch<React.SetStateAction<Number>>
}

export default function InfoSection({lot, socket, currentPrice, setCurrentPrice, value, setValue, setStatus, status}: InfoSectionProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    const handleBid = () => {
        if(!socket) return
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
        }, 3000)
        return prev; 
        }
        return prev - lot.stepPrice;
    }); 
    }

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleBuyNow = async () => {

    setProgress(true)
    timerRef.current = setTimeout(async () => {
        try {
            const data = await buyNow( lot.lotNumber, value)
            if (data?.success) setStatus('Completed')
            setProgress(false)
        } catch (error:any) {
            setMessage(t('lot', error.message))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }

    }, 3000)
    }

    const handleLeaveBuyNow = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current)
    }
    setProgress(false)
    }
        
    if(!lot) return
    
    const buttonInput = 'bg-gray-200 flex justify-center items-center text-black rounded-md'

  return ( 
    <div onClick={() => setOpen(prev => !prev)} className={`${columnBlock} w-full text-black fixed bg-white z-100 bottom-0 ${open ? '!h-1/2' : '!h-30'} ${animate}`}>
        {status !== 'Active' ? (
            <h1 className="font-bold text-2xl text-gray-500">Лот куплен</h1>
        ): (
            <h1 className="font-bold">{t('lot','lot-currentPrice')}<br/><span className="text-3xl">{currentPrice} ₴</span></h1>
        )}

        {status === 'Active' && (
            <>
                <Countdown date={lot.date.toString()}/>
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
                <button onMouseDown={handleBuyNow} onMouseLeave={handleLeaveBuyNow} onMouseUp={handleLeaveBuyNow} className={`w-full ${hover} text-black border-orange-600 border !text-orange-600 rounded-md p-2 text-lg relative`}>
                    {t('lot', 'lot-buyNow')} <span className="font-bold">( {lot.blitzPrice} ₴ )</span>
                    <div className={`absolute top-0 left-0 h-full bg-orange-600/50 ${progress ? 'w-full transition-all duration-[3000ms] ease-in' : 'w-0'}`}/>
                </button>
            </>
        )} 
    </div>
  )
}


