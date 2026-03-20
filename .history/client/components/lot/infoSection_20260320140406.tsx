
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
import Link from "next/link"

interface InfoSectionProps {
    lot: LotTypes,
    socket: Socket,
    currentPrice: number,
    setStatus: (t:string) => void
    status:string
    setCurrentPrice: (t:number) => void
    value:number,
    setValue: React.Dispatch<React.SetStateAction<Number>>
    auth:boolean
}

export default function InfoSection({lot, socket, currentPrice, setCurrentPrice, value, setValue, setStatus, status, auth}: InfoSectionProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    const handleBid = () => {
        if(!socket) return
        if(!auth) {
            setMessage('Вы не вошли в аккаунт')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
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
    <div {...handlers} className={`${columnBlock} rounded-t-2xl w-full text-black fixed md:static bg-white z-20 md:z-0 bottom-0 ${open ? '!h-80 md:!h-full' : '!h-35 md:!h-full'} ${animate}`}>
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
                        
            </>
        )} 
    </div>
  )
}


