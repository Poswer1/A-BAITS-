
import { BASE_URL } from "@/services/utils"
import { useTranslation } from "@/app/context/TranslationProvider"
import { animate, button, customInput } from "@/styles/global"
import { columnBlock} from "@/styles/lot"
import { animationOpacity, hover } from "@/styles/style"
import { Plus, Minus, LogIn, AlertTriangle, Ban, Hammer, Gavel } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { buyNow } from "@/services/payment"
import { LotTypes } from "@/types/types"
import Countdown from "../ui/countdown"
import { useSwipeable } from "react-swipeable"
import { useRouter } from "next/navigation"
import GetStatusUser from "@/utils/getStatusUser"
import Toast from "../ui/toast"
import { getMyAutoBid } from "@/services/lot"

interface InfoSectionProps {
    lot: LotTypes | null,
    socket: Socket | null,
    currentPrice: number,
    setStatus: (t:string) => void
    status:string
    setCurrentPrice: (t:number) => void
    value:number,
    setValue: React.Dispatch<React.SetStateAction<number>>
    auth:boolean
}

export default function InfoSection({lot, socket, currentPrice, setCurrentPrice, value, setValue, setStatus, status, auth}: InfoSectionProps) {

    const {t} = useTranslation()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(false)
    const [typeBid, setTypeBid] = useState('default')
    const [myAutoBid, setMyAutoBid] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { status: statusUser } = GetStatusUser()

    const hasHistory = !!lot && (((lot.historyBid?.length ?? 0) > 0) || currentPrice > lot.startPrice)
    const minBid = lot ? (hasHistory ? currentPrice + lot.stepPrice : currentPrice) : 0

    const handleBid = () => {
        if(!socket || !lot) return
        if(!auth) {
            router.push('/auth/login')
            return
        }
        if(value < minBid) {
            setError(`${t('lot', 'lot-lowStep')} ${minBid} ₴`);
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
            socket.emit('placeBid',
            {
                lotId: lot?.lotNumber, 
                bid: value
            })   
    }

    const handleAutoBid = () => {
        if(!socket || !lot) return
        if(!auth) {
            router.push('/auth/login')
            return
        }
        if(value < minBid) {
            setError(`${t('lot', 'lot-lowStep')} ${minBid} ₴`);
            setTimeout(() => {
                setError('')
            }, 3000)
            return
        }
        socket.emit('autoBid', {lotId: lot?.lotNumber, bid: value})
        setMyAutoBid(value)
    }

    const handlePlus = () => setValue(prev => prev + (lot?.stepPrice || 0))

    const handleMinus = () => {
        if(!lot) return
        setValue(prev => {
        if (prev - lot.stepPrice < minBid) {
        setError(`${t('lot', 'lot-lowStep')} ${minBid} ₴`);
        setTimeout(() => {
            setError('')
        }, 3000)
        return prev; 
        }
        return prev - lot.stepPrice;
    }); 
    }

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleBuyNow = async () => {
    if(!lot) return
    setProgress(true)
    timerRef.current = setTimeout(async () => {
        try {
            const data = await buyNow(lot._id, lot.blitzPrice ?? value)
            if (data?.success) setStatus('Completed')
            setProgress(false)
            setMessage(t("lot", "lotBuySucess"))
            setTimeout(() => {
                setMessage('')
            }, 3000)
        } catch (error:any) {
            setError(t('lot', error.message))
            setTimeout(() => {
                setError('')
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
    useEffect(() => {
        if(!auth || !lot?.lotNumber) return
        getMyAutoBid(lot.lotNumber)
        .then(data => setMyAutoBid(data?.max ?? null))
        .catch(() => setMyAutoBid(null))
    }, [auth, lot?.lotNumber])

    if(!lot) return
    
    const buttonInput = 'bg-gray-200 flex justify-center items-center text-black rounded-md'

  return ( 
    <div {...handlers} className={`${columnBlock} rounded-t-2xl w-full md:min-w-80 text-black fixed md:static bg-white z-20 md:z-0 bottom-0 ${open ? '!h-80 md:!h-full' : '!h-35 md:!h-full'} ${animate}`}>
        {status !== 'Active' ? (
            <h1 className={`${status === 'Blocked' ? 'text-red-500' : 'text-gray-500'} font-bold flex gap-2 text-2xl items-center`}>
                {status === 'Blocked' ? <Ban /> : <Gavel />}
                {status === 'Blocked' ? t('lot', 'lotBlocked') : 'Лот куплен'}
            </h1>
        ): (
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold gap-1">{t('lot','lot-currentPrice')}<br/><span className="text-3xl">{currentPrice} ₴</span></h1>
                <button onClick={() => setOpen(true)} className={`${button} ${animate} ${open ? 'opacity-0' : 'opacity-100'} text-sm md:hidden`}>{t('lot', 'lot-doBid')}</button>
            </div>
        )}

        {status === 'Active' && (
            <>
            <span className="text-black flex gap-1">{t('lot', 'lot-dateStop')}<Countdown date={lot.date.toString()}/></span>
                    {statusUser === 'Temporary' ? (
                        <div className="flex justify-start w-full gap-2 text-yellow-400">
                            <AlertTriangle />
                            <h1>{ t('violations', 'Temporary')}</h1>
                        </div>
                    ): (
                    <>
                        <div className={`${customInput} py-2`}>
                            <span className="font-bold">₴</span>
                            <input placeholder="950" className="w-full outline-none" value={value} onChange={(e) => setValue(Number(e.target.value))}/>
                            <div className="flex justify-center items-center gap-2">
                                <Minus className={`${buttonInput} ${hover}`} onClick={handleMinus}/>
                                <Plus className={`${buttonInput} ${hover}`} onClick={handlePlus}/>
                            </div>
                        </div> 
                        <div className="flex justify-start items-center w-full gap-5">
                            <div className="flex gap-1">
                               <input type="radio" className="accent-orange-600" checked={typeBid === 'default'} value="default" onChange={() => setTypeBid('default')}/>
                               <span className="text-sm">{t('lot', 'default')}</span>
                            </div>
                            <div className="flex gap-1">
                               <input type="radio" className="accent-orange-600" checked={typeBid === 'auto'} value="auto" onChange={() => setTypeBid('auto')}/>
                               <span className="text-sm">{t('lot', 'autoBid')}</span>
                            </div>
                        </div>
                        <button onClick={() => typeBid === 'default' ? handleBid() : handleAutoBid()} className={`${button} w-full ${hover} text-lg`}>{typeBid === 'default' ? t('lot', 'lot-doBid') : t('lot', 'doAutoBid')}</button>
                        {myAutoBid !== null && (
                            <span className="text-sm text-gray-500">Моя автоставка: <b className="text-black">{myAutoBid} ₴</b></span>
                        )}
                        {(lot.blitzPrice !== 0 && lot.blitzPrice) && (
                        <button 
                        onMouseDown={handleBuyNow} 
                        onMouseLeave={handleLeaveBuyNow} 
                        onMouseUp={handleLeaveBuyNow} 
                        onTouchStart={handleBuyNow} 
                        onTouchEnd={handleLeaveBuyNow} 
                        onTouchCancel={handleLeaveBuyNow} 
                        className={`w-full user-select-none ${hover} text-black border-orange-600 border !text-orange-600 rounded-md p-2 text-lg relative`}
                        >
                        {t('lot', 'lot-buyNow')} <span className="font-bold">( {lot.blitzPrice} ₴ )</span>
                        <div className={`absolute top-0 left-0 h-full bg-orange-600/50 ${progress ? 'w-full transition-all duration-[3000ms] ease-in' : 'w-0'}`}/>
                        </button>   
                        )}
                    </>
                    )}  
            </>
        )} 
        <Toast message={message} error={error}/>
    </div>
  )
}


