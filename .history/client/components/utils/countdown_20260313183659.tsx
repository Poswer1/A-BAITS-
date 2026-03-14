'use client'

import { useEffect, useState } from "react"

export default function countdown({date}: {date:string}) {

    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        const target = new Date(date).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = now - target

            
        })

    }, [])

  return (
    <div>
      
    </div>
  )
}
