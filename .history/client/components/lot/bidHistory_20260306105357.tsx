import { getUserById } from "@/services/user";
import { useTranslation } from "@/app/context/TranslationProvider";
import { columnBlock } from "@/styles/lot";
import { getRelativeTime } from "../utils/relativeTime";
import { useParams } from "next/navigation";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { avatarBlock } from "@/styles/global";
import AvatarBlock from "../utils/avatar";
import Link from "next/link";

interface BidHistoryProps {
  lot:any,
  socket: Socket
  userHistory: any
}

export default function BidHistory({userHistory}:BidHistoryProps) {


    const params = useParams() 
    const lang = params.lang as string

    const {t} = useTranslation()
  return (
    <div className={`${columnBlock}`}>
      <h1 className="font-bold">{t('lot', 'lot-historyBid')}</h1>
      <div className="flex flex-col justify-start items-start overflow-auto max-h-full gap-5 custom-scrollbar">
        {userHistory.length === 0 ? (
            <span className="text-gray-500">Ставок пока что нету</span>
          ): (
          userHistory.map((user ,i) => (
            <div key={i} className="flex justify-center items-center gap-2">
              <Link href={`/${lang}/profile/${user?.name}`}><AvatarBlock avatar={user?.avatar} size="45"/></Link>
              <div className="flex flex-col justify-center items-start">
              <h1>{user?.name || ''}</h1>
              <span className="text-sm text-orange-600">{t('lot', 'lot-userDoBid')} {user?.currentBid} ₴</span>
              <p className="text-gray-500 text-sm">{getRelativeTime(user?.dateBid, lang)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

