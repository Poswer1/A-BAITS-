'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "@/app/context/TranslationProvider"
import { useSocketContext } from "@/app/context/SocketIo"
import { getStatusAuth } from "@/services/auth"
import { viewsCount } from "@/services/lot"
import { LotTypes } from "@/types/types"
import { overlay } from "@/styles/global"
import { animationScale } from "@/styles/style"
import AuthorSection from "@/components/lot/authorSection"
import BidHistory from "@/components/lot/bidHistory"
import DescriptioSection from "@/components/lot/descriptioSection"
import HeaderLot from "@/components/lot/headerLot"
import InfoSection from "@/components/lot/infoSection"
import PhotoSection from "@/components/lot/photoSection"
import AvatarBlock from "@/components/ui/avatar"
import Toast from "@/components/ui/toast"

interface BidUser {
  avatar: string
  name: string
}

interface UserHistory {
  _id: string
  avatar: string
  name: string
  dateBid: Date
  currentBid: number
}

interface LotDetailsProps {
  lot: LotTypes
}

export default function LotDetails({ lot }: LotDetailsProps) {
  const params = useParams()
  const { t } = useTranslation()
  const numberLot = params.numberLot as string
  const { socket } = useSocketContext()
  const [error, setError] = useState('')
  const [currentPrice, setCurrentPrice] = useState(lot.startPrice)
  const [userHistory, setUserHistory] = useState<UserHistory[]>([])
  const [status, setStatus] = useState(lot.status)
  const [newBid, setNewBid] = useState<BidUser | null>(null)
  const [auth, setAuth] = useState(false)
  const [buyNowConfirm, setBuyNowConfirm] = useState(false)
  const [value, setValue] = useState(
    lot.historyBid?.length ? lot.startPrice + lot.stepPrice : lot.startPrice
  )

  useEffect(() => {
    viewsCount(lot._id).catch(() => undefined)
    getStatusAuth().then(setAuth).catch(() => setAuth(false))
  }, [lot._id])

  useEffect(() => {
    if (!socket) return

    socket.emit('joinLot', numberLot)

    const handleBidUpdated = (data: { lotId: string; newPrice: number; lastBid: UserHistory }) => {
      if (data.lotId === numberLot) {
        setCurrentPrice(data.newPrice)
        setUserHistory(prev => [data.lastBid, ...prev])
        setNewBid(data.lastBid)
      }

      const audio = new Audio('/sounds/bid.mp3')
      audio.play().catch(() => undefined)
      setTimeout(() => setNewBid(null), 2000)
    }

    const handleBidError = (data: { message: string }) => {
      setError(t('lot', data.message))
      setTimeout(() => setError(''), 3000)
    }

    const handleHistory = (data: { historyUser: UserHistory[] }) => {
      setUserHistory(data.historyUser)
    }

    socket.on('bidUpdated', handleBidUpdated)
    socket.on('bidError', handleBidError)
    socket.on('getHistoryBid', handleHistory)
    socket.emit('HistoryBid', numberLot)

    return () => {
      socket.off('bidUpdated', handleBidUpdated)
      socket.off('getHistoryBid', handleHistory)
      socket.off('bidError', handleBidError)
    }
  }, [numberLot, socket, t])

  return (
    <div className="flex flex-col justify-start items-center w-full relative min-h-150 h-screen">
      <div className={`hidden md:block w-full sticky top-0 ${buyNowConfirm ? 'z-0' : 'z-10'}`}>
        <HeaderLot lot={lot} />
      </div>
      <div className="flex flex-col md:flex-row justify-start items-start 2xl:w-[80%] lg:w-[90%] py-2 md:gap-2  md:h-200">
        <PhotoSection lot={lot} />
        <div className="flex flex-col justify-start items-start w-full md:w-auto">
          <div className="md:hidden">
            <HeaderLot lot={lot} />
          </div>
          <InfoSection
            lot={lot}
            socket={socket}
            currentPrice={currentPrice}
            setCurrentPrice={setCurrentPrice}
            value={value}
            setValue={setValue}
            status={status}
            setStatus={setStatus}
            auth={auth}
            buyConfirm={buyNowConfirm}
            setBuyConfirm={setBuyNowConfirm}
          />
          <AuthorSection lot={lot} />
          <DescriptioSection lot={lot} />
        </div>
        <BidHistory userHistory={userHistory} auth={auth} />
      </div>
      {newBid && (
        <div className={`${overlay} flex-col gap-2`}>
          <AvatarBlock avatar={newBid.avatar} size="110" />
          <h1 className={`text-white text-xl text-center font-bold ${animationScale}`}>
            <span className="text-orange-600">{newBid.name || 'Пользователь'} </span>
            {t('lot', 'userMadeNewBid')}
          </h1>
        </div>
      )}
      <Toast message="" error={error} />
    </div>
  )
}
