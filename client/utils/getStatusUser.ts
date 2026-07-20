'use client'

import { getUserStatus } from "@/services/user"
import { useEffect, useState } from "react"

export default function GetStatusUser() {

    const [status, setStatus] = useState('')
    const [UnblockDate, setUnblockDate] = useState('')

    useEffect(() => {
        getUserStatus()
        .then(data => {
            setStatus(data.status)
            setUnblockDate(data.UnblockDate)
        })
    }, [])

    return {status, UnblockDate}
}


