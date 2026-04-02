'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { getAllTurnover, getLotsCount } from "@/services/admin/lots"
import { getCountRegisteredUsers, getUserCount } from "@/services/admin/user"
import { useEffect, useState } from "react"

export default function page() {

    const {t} = useTranslation()

    const [countLots, setCountLots] = useState(0)
    const [countUsers, setCountUsers] = useState(0)
    const [countRegisteredUsers, setCountRegisteredUsers] = useState(0)

    useEffect(() => {
        getLotsCount()
        .then(data => {
            setCountLots(data)
        })
        getUserCount()
        .then(data => {
            setCountUsers(data)
        })
        getCountRegisteredUsers()
        .then(data => {
            setCountRegisteredUsers(data)
        })
        getAllTurnover()
        .then(data => {
            
        })
    }, [])

    const mainData = [
        {name: t('admin', 'TotalTurnover'), value: 1200},
        {name: t('admin', 'CountRegisteredUsers'), value: countRegisteredUsers},
        {name: t('admin', 'Users'), value: countUsers},
        {name: t('admin', 'Lots'), value: countLots},
    ]


  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-start items-center w-full gap-5">
        {mainData.map(data => (
            <div className="flex flex-col justify-center items-start bg-white p-2 rounded-xl w-50">
                <h1 className="text-md font-bold">{data.name}</h1>
                <span>{data.value}</span>
            </div>
        ))}
      </div>
    </div>
  )
}

