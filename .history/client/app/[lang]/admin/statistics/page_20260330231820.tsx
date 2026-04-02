'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import Schedule from "@/components/admin/Schedule"
import { getAllTurnover, getLotsCount } from "@/services/admin/lots"
import { getCountRegisteredUsers, getUserCount } from "@/services/admin/user"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function page() {

    const {t} = useTranslation()

    const [countLots, setCountLots] = useState(0)
    const [countUsers, setCountUsers] = useState(0)
    const [countRegisteredUsers, setCountRegisteredUsers] = useState(0)
    const [allTurnover, setAllTurnover] = useState(0)

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
            setAllTurnover(data)
        })
    }, [])

    const mainData = [
        {name: t('admin', 'TotalTurnover'), value: allTurnover, price: true},
        {name: t('admin', 'CountRegisteredUsers'), value: countRegisteredUsers},
        {name: t('admin', 'Users'), value: countUsers},
        {name: t('admin', 'Lots'), value: countLots},
    ]

    const data = [
        { createdAt: '2026-03-01', total: 1200 },
        { _id: '2026-03-02', total: 1500 }      
    ]

  return (
    <div className="flex flex-col justify-center items-start w-full gap-5">
      <div className="flex justify-start items-center w-full gap-5">
        {mainData.map(data => (
            // <div className="flex flex-col justify-center items-start bg-white p-2 rounded-xl w-50">
            //     <h1 className="text-md font-bold">{data.name}</h1>
            //     <span>{data.value} {data.price && '₴'}</span>
            // </div>
             <div className="flex flex-col justify-center items-start">
                <h1 className="text-md font-bold">{data.name}</h1>
            </div>
        ))}
      </div>
        <Schedule data={data} />
    </div>
  )
}

