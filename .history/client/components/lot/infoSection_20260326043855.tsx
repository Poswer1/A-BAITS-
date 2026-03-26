
import { BASE_URL } from "@/services/utils"
import { useTranslation } from "@/app/context/TranslationProvider"
import { animate, button, customInput } from "@/styles/global"
import { columnBlock} from "@/styles/lot"
import { animationOpacity, hover } from "@/styles/style"
import { Plus, Minus, LogIn } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { buyNow } from "@/services/payment"
import { LotTypes } from "@/types/types"
import Countdown from "../ui/countdown"
import { useSwipeable } from "react-swipeable"
import { useRouter } from "next/navigation"

interface InfoSectionProps {
    lot: LotTypes | null,
    socket: Socket | null,
    currentPrice: number,
    setStatus: (t:string) => void
    status:string
    setCurrentPrice: (t:number) => void
    value:number,
    setValue: React.Dispatch<React.SetStateAction<string[]>>
    auth:boolean
}

export default function InfoSection({lot, socket, currentPrice, setCurrentPrice, value, setValue, setStatus, status, auth}: InfoSectionProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleBid = () => {
        if(!socket) return
        if(!auth) {
            router.push('/auth/login')
        }
            socket.emit('placeBid',
            {
                lotId: lot?.lotNumber, 
                bid: value
            })   
    }

    const handlePlus = () => setValue(prev => prev + (lot?.stepPrice || 0))

    const handleMinus = () => {
        if(!lot) return
        setValue(prev => {
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
            const data = await buyNow(lot._id, value)
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

    const handlers = useSwipeable({
        onSwipedUp: () => setOpen(true),
        onSwipedDown: () => setOpen(false),
        preventScrollOnSwipe: true, // не прокручивать страницу во время свайпа
    })
        
    if(!lot) return
    
    const buttonInput = 'bg-gray-200 flex justify-center items-center text-black rounded-md'

  return ( 
    <div {...handlers} className={`${columnBlock} rounded-t-2xl w-full md:min-w-80 text-black fixed md:static bg-white z-20 md:z-0 bottom-0 ${open ? '!h-80 md:!h-full' : '!h-35 md:!h-full'} ${animate}`}>
        {status !== 'Active' ? (
            <h1 className="font-bold text-2xl text-gray-500">Лот куплен</h1>
        ): (
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold">{t('lot','lot-currentPrice')}<br/><span className="text-3xl">{currentPrice} ₴</span></h1>
                <button onClick={() => setOpen(true)} className={`${button} ${animate} ${open ? 'opacity-0' : 'opacity-100'} text-sm md:hidden`}>{t('lot', 'lot-doBid')}</button>
            </div>
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
                    <button onMouseDown={handleBuyNow} onMouseLeave={handleLeaveBuyNow} onMouseUp={handleLeaveBuyNow} onTouchStart={handleBuyNow} onTouchEnd={handleLeaveBuyNow} onTouchCancel={handleLeaveBuyNow} className={`w-full user-select-none ${hover} text-black border-orange-600 border !text-orange-600 rounded-md p-2 text-lg relative`}>
                        {t('lot', 'lot-buyNow')} <span className="font-bold">( {lot.blitzPrice} ₴ )</span>
                    <div className={`absolute top-0 left-0 h-full bg-orange-600/50 ${progress ? 'w-full transition-all duration-[3000ms] ease-in' : 'w-0'}`}/>
                    </button>            
            </>
        )} 
    </div>
  )
}


