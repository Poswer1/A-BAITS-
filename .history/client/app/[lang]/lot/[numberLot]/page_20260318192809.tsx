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
import { columnBlock } from "@/styles/lot"
import { ChevronRight, Copy } from "lucide-react"
import { useTranslation } from "@/app/context/TranslationProvider"
import FavoritesButton from "@/components/ui/favoritesButton"

function page() {

    const params = useParams()
    const numberLot = params.numberLot as string
    console.log(numberLot)

    const [lot, setLot] = useState<LotTypes | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [userHistory, setUserHistory] = useState<any[]>([])
    const [status, setStatus] = useState('')
    const [value, setValue] = useState(0)
    const { socket } = useSocketContext()

    const {t} = useTranslation()

    useEffect(() => {

        if(!socket) return

        socket.emit('joinLot', numberLot) 
        
        socket.on('bidUpdated', (data) => {
          if(data.lotId === numberLot) {
              setCurrentPrice(data.newPrice)
              setValue(data.newPrice)
              setUserHistory(prev => [...prev, data.lastBid])
            }
            const audio = new Audio('/sounds/bid.mp3')
            audio.play()
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
    }, [numberLot])


  return (
    <div className="flex flex-col justify-center items-center w-full relative  min-h-150">
      {!lot ? (
        <Loading />
      ): (
        <>
          <HeaderLot lot={lot}/>
          <div className="flex flex-col md:flex-row justify-start items-start 2xl:w-[80%] lg:w-[90%] py-2 gap-2 min-h-200">
              <PhotoSection lot={lot}/>
              <div className="flex flex-col justify-start items-start w-full md:w-auto">
                
                <div className={`${columnBlock} md:hidden`}>
                   <h1 className="text-2xl font-bold">{lot.name || 'Not Found'}</h1>
                   <span className="flex gap-1">
                        № лота 
                        <span className="text-orange-600">{lot.lotNumber || '11111111'}</span>
                        <Copy className="text-orange-600 w-4 cursor-pointer"/>
                  </span>
                  <FavoritesButton id={lot._id}/>
                </div>

                <InfoSection lot={lot} socket={socket} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} value={value} setValue={setValue} status={status} setStatus={setStatus}/>
                
                <div className={`${columnBlock} md:hidden`}>
                  <h1 className="font-bold">{t('lot', 'AboutLot')}</h1>
                    <span className="flex text-black">{lot.category} <ChevronRight className="w-5"/> {lot.subCategory} {lot.subSubCategory && lot.subSubCategory}</span>
                    <span>{t('lot', 'lot-state')} <span className="text-orange-600">{lot.state}</span></span>
                    <span>{t('lot', 'lot-location')}<span className="text-black font-bold"> {lot.location}</span></span>
                </div>

                <AuthorSection lot={lot}/> 
              </div>
              <BidHistory lot={lot} socket={socket} userHistory={userHistory}/>
          </div>
          <DescriptioSection lot={lot}/>
        </>
      )}
    </div>
  )
}

export default page
