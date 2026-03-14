'use client'

import { useEffect, useState } from "react"

export default function countdown({date}: {date:string}) {

    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        const target = new Date(date).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = now - target

            if(diff <= 0) {
                setTimeLeft(0)
                clearInterval(interval)
            } else {
                setTimeLeft(diff)
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [])

  return (
    <div>
      
    </div>
  )
}
