'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import Loading from "@/components/utils/loadig"
import { getRelativeTime } from "@/components/utils/relativeTime"
import { myHistoryLot } from "@/services/lot"
import { loadingBlock } from "@/styles/global"
import { pageContainerClass } from "@/styles/profile/profile"
import { animationOpacity } from "@/styles/style"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function page() {

  const {t} = useTranslation()

  const param = useParams()
  const lang = param.lang as string

  const [loading, setLoading] = useState(true) 
  const [historyBids, setHistoryBids] = useState<any[]>([])
  const [allHistoryCurrnetBid, setAllHistoryCurrentBid] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) return

    myHistoryLot(token)
    .then(data => {
      setHistoryBids(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className={pageContainerClass}>
      {loading ? (
        <div className={loadingBlock}>
          <Loading />
        </div>
      ): (
        <>
         <h1 className="text-2xl">{t('profile', 'historyBids')}</h1>
         {historyBids.map((bid, index) => (
            <Link href={`/${lang}/lot/${bid.lotNumber}`} className="flex justify-between items-center bg-white rounded-md pt-4 p-4 w-full cursor-pointer" key={index}>
              {bid.name}
              <div className="flex gap-5">
                <span>{t('lot', 'lot-current-bid')}:
                  <span className="text-orange-600">{bid.startPrice} ₴</span>
                </span>
                <span className="relative" onMouseEnter={() => setAllHistoryCurrentBid(true)} onMouseLeave={() => setAllHistoryCurrentBid(false)}>{t('lot', 'lot-myBet')}:
                  <span className="text-orange-600">{bid.historyBid[bid.historyBid.length - 1]?.currentBid || 0} ₴</span>
                  {allHistoryCurrnetBid && (
                  <div className={`${animationOpacity} flex flex-col justify-start items-start bg-white p-4 rounded-xl text-black absolute top-0 left-0 gap-4`}>
                    <h1>Вся история ставок</h1>
                    {bid.historyBid.map((b: any, i: number) => (
                      <div key={i} className="flex flex-col justify-start items-start">
                        <span className="text-orange-600">{b.currentBid} ₴</span>
                        <span className="text-sm text-gray-500">{getRelativeTime(b.createdAt, lang)}</span>
                      </div>
                    ))}
                  </div>
                )}
                </span>
              </div>
            </Link>
         ))}
        </>
      )}
    </div>
  )
}

export default page
