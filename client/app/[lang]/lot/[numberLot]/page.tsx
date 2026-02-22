'use client'

import { getLot } from "@/services/lot"
import AuthorSection from "@/components/lot/authorSection"
import BidHistory from "@/components/lot/bidHistory"
import HeaderLot from "@/components/lot/headerLot"
import InfoSection from "@/components/lot/infoSection"
import PhotoSection from "@/components/lot/photoSection"
import Loading from "@/components/utils/loadig"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:3002', {
    path: '/socket.io',
    transports: ["websocket"],
    auth: {token: localStorage.getItem('token')}
})

function page() {

    const params = useParams()
    const numberLot = params.numberLot as string
    console.log(numberLot)

    const [lot, setLot] = useState<any | null>(null)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [userHistory, setUserHistory] = useState<any[]>([])
    const [value, setValue] = useState(0)

    useEffect(() => {
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
    }, [])


    useEffect(() => {
     if(!numberLot) return
        getLot(numberLot)
        .then(data => {
            setLot(data)
            setCurrentPrice(data.startPrice)
            setValue(data.startPrice + data.stepPrice)
        })
    }, [numberLot])


  return (
    <div className="flex flex-col justify-center items-center w-full relative mt-5 min-h-150">
      {!lot ? (
        <Loading />
      ): (
        <>
        <HeaderLot lot={lot}/>
        <div className="flex  justify-start items-start w-[80%] py-2 gap-2 h-200">
            <PhotoSection lot={lot}/>
            <div className="flex flex-col justify-start items-start">
              <InfoSection lot={lot} socket={socket} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice} value={value} setValue={setValue}/>
              <AuthorSection lot={lot}/> 
            </div>
            <BidHistory lot={lot} socket={socket} userHistory={userHistory}/>
        </div>
        </>
      )}
    </div>
  )
}

export default page
