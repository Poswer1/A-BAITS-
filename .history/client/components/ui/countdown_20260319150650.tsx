'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { useEffect, useState } from "react"

export default function Countdown({date}: {date:string}) {

    const [timeLeft, setTimeLeft] = useState(new Date(date).getTime() - Date.now())
    const {t} = useTranslation()

    useEffect(() => {
        const target = new Date(date).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = target - now

            if(diff <= 0) {
                setTimeLeft(0)
                clearInterval(interval)
            } else {
                setTimeLeft(diff)
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [date])

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div>
      {timeLeft > 0 ? (
        <span className={`text-base`}>{t('lot', 'lot-dateStop')} <span className="text-orange-600">{days}д {hours}ч {minutes}м {seconds}с</span></span>
      ) : (
        <span>{t('lot', 'timeIsUp')}</span>
      )}
    </div>
  )
}
