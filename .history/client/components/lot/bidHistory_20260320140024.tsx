import { getUserById } from "@/services/user";
import { useTranslation } from "@/app/context/TranslationProvider";
import { columnBlock } from "@/styles/lot";
import { getRelativeTime } from "../ui/relativeTime";
import { useParams } from "next/navigation";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { avatarBlock } from "@/styles/global";
import AvatarBlock from "../ui/avatar";
import Link from "next/link";

interface BidHistoryProps {
  userHistory: any
  auth:boolean
}

export default function BidHistory({userHistory, auth}:BidHistoryProps) {
    const params = useParams() 
    const lang = params.lang as string

    const {t} = useTranslation()
  return (
    <div className={`${columnBlock} w-full md:w-auto text-black`}>
      {auth ? (

      ): (
        <>

        </>
      )}
    </div>
  )
}

