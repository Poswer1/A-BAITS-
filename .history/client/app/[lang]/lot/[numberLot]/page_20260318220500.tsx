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
import { overlay } from "@/styles/global"
import AvatarBlock from "@/components/ui/avatar"


function page() {

    const params = useParams()
    const lang = params.lang as string
    const numberLot = params.numberLot as string
    console.log(numberLot)

    const [lot, setLot] = useState<LotTypes | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [userHistory, setUserHistory] = useState<any[]>([])
    const [status, setStatus] = useState('')
    const [newBid, setNewBid] = useState('')
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
    <div className="flex flex-col justify-center items-center w-full relative min-h-150">
      {!lot ? (
        <Loading />
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

                <InfoSection lot={lot} socket={socket} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} value={value} setValue={setValue} status={status} setStatus={setStatus}/>

                <AuthorSection lot={lot}/> 
                <DescriptioSection lot={lot}/>
              </div>
              <BidHistory lot={lot} socket={socket} userHistory={userHistory}/>
          </div>
        </>
      )}
      
        <div className={`${overlay} flex-col gap-2`}>
          <AvatarBlock avatar={newBid?.avatar} size="50"/>
          <h1 className="text-white text-xl"><span className="text-or">{newBid?.name || 'никнейем'}</span> сделал новую ставку!</h1>
        </div>
      
    </div>
  )
}

export default page
