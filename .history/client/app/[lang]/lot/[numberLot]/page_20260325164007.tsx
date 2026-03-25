'use client'

import { getLot } from "@/services/lot"
import AuthorSection from "@/components/lot/authorSection"
import BidHistory from "@/components/lot/bidHistory"
import HeaderLot from "@/components/lot/headerLot"
import InfoSection from "@/components/lot/infoSection"
import PhotoSection from "@/components/lot/photoSection"
import Loading from "@/components/ui/loadig"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSocketContext } from "@/app/context/SocketIo"
import { LotTypes } from "@/types/types"
import DescriptioSection from "@/components/lot/descriptioSection"
import { overlay } from "@/styles/global"
import AvatarBlock from "@/components/ui/avatar"
import { animationScale } from "@/styles/style"
import { useTranslation } from "@/app/context/TranslationProvider"
import { getStatusAuth } from "@/services/auth"


function page() {

    const params = useParams()
    const {t} = useTranslation()
    const lang = params.lang as string
    const numberLot = params.numberLot as string
    console.log(numberLot)

    const [lot, setLot] = useState<LotTypes | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [userHistory, setUserHistory] = useState<any[]>([])
    const [status, setStatus] = useState('')
    const [newBid, setNewBid] = useState('')
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const [value, setValue] = useState(0)
    const { socket } = useSocketContext()

  
    useEffect(() => {

        if(!socket) return

        socket.emit('joinLot', numberLot) 
        
        socket.on('bidUpdated', (data) => {
          if(data.lotId === numberLot) {
              setCurrentPrice(data.newPrice)
              setValue(data.newPrice)
              setUserHistory(prev => [...prev, data.lastBid])
              setNewBid(data.lastBid)
            }
            const audio = new Audio('/sounds/bid.mp3')
            audio.play()
            setTimeout(() => {
              setNewBid('')
            }, 2000)
        })

        socket.emit('HistoryBid', numberLot)

        socket.on('getHistoryBid', (data) => {
            setUserHistory(data.historyUser)
        })

       return () => {
        socket.off("bidUpdated")
        socket.off('getHistoryBid')
      }
    }, [socket])


    useEffect(() => {
     if(!numberLot) return
        getLot(numberLot)
        .then(data => {
            setLot(data)
            setCurrentPrice(data.startPrice)
            setStatus(data.status)
            setValue(data.startPrice + data.stepPrice)
        })
        getStatusAuth()
        .then(data => {
          setAuth(data);   
        })
    }, [numberLot])


  return (
    <div className="flex flex-col justify-center items-center w-full relative min-h-150 h-auto">
      {loading ? (
        <div className="flex flex-col md:flex-row justify-start items-start 2xl:w-[80%] lg:w-[90%] py-2 md:gap-2 min-h-200 md:h-200">
          <div className="flex flex-col w-1/2 gap-2">
            <div className="h-130 skeleton w-full"></div>
            <div className="flex flex-wrap w-full gap-5">
              {Array.from({length: 8}).map((_, index) => (
                <div key={index} className="w-20 md:w-1/6 2xl:w-1/7 h-27 skeleton"></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-1/3">
          </div>
        </div>
      ): (
        <>
          <div className="hidden md:block w-full sticky top-0 z-10">
            <HeaderLot lot={lot}/>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-start 2xl:w-[80%] lg:w-[90%] py-2 md:gap-2 min-h-200 md:h-200">
              <PhotoSection lot={lot}/>
              <div className="flex flex-col justify-start items-start w-full md:w-auto">
                <div className={`md:hidden`}>
                  <HeaderLot lot={lot} />
                </div>

                <InfoSection lot={lot} socket={socket} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} value={value} setValue={setValue} status={status} setStatus={setStatus} auth={auth}/>

                <AuthorSection lot={lot}/> 
                <DescriptioSection lot={lot}/>
              </div>
              <BidHistory lot={lot} socket={socket} userHistory={userHistory} auth={auth}/>
          </div>
        </>
      )}
      {newBid && (
        <div className={`${overlay} flex-col gap-2`}>
          <AvatarBlock avatar={newBid?.avatar} size="110"/>
          <h1 className={`text-white text-xl text-center font-bold ${animationScale}`}><span className="text-orange-600">{newBid?.name || 'Пользователь'} </span>{t('lot', 'userMadeNewBid')}</h1>
        </div>
      )}  
    </div>
  )
}

export default page
