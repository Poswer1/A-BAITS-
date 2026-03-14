'use client'

import { useEffect, useState } from "react"

export default function countdown({date}: {date:string}) {

    const [timeLeft, setTimeLeft] = useState(0)

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
    }, [])

const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div>
      
    </div>
  )
}
