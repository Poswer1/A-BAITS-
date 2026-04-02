'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import Schedule from "@/components/admin/Schedule"
import { getAllTurnover, getLotsCount } from "@/services/admin/lots"
import { getCountRegisteredUsers, getUserCount } from "@/services/admin/user"
import { hover } from "@/styles/style"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function page() {

    const {t} = useTranslation()

    const [dataStatistics, setDataStatistics] = useState(0)
    const [active, setActive] = useState(t('admin', 'TotalTurnover'))

    useEffect(() => {
        if(active === t('admin', 'TotalTurnover')) {
            getLotsCount()
            .then(data => {
                setCountLots(data)
            })
        } else if(active === t('admin', 'Users')) {
            getUserCount()
            .then(data => {
                setCountUsers(data)
            })
        } else if(active === t('admin', 'CountRegisteredUsers')) {
            getCountRegisteredUsers()
            .then(data => {
                setCountRegisteredUsers(data)
            })
        } else if(active === t('admin', 'TotalTurnover')) {
            getAllTurnover()
            .then(data => {
                setAllTurnover(data)
            })
        }
    }, [])

    const mainData = [
        {name: t('admin', 'TotalTurnover')price: true},
        {name: t('admin', 'CountRegisteredUsers')},
        {name: t('admin', 'Users')},
        {name: t('admin', 'Lots')},
    ]

    const data = [
        { createdAt: '2026-03-01', total: 1200 },
        { createdAt: '2026-03-02', total: 1500 }      
    ]

  return (
    <div className="flex flex-col justify-center items-start w-full gap-5">
      <div className="flex justify-start items-center w-full gap-5">
        {mainData.map(data => (
             <div className="flex flex-col justify-center items-start">
                <h1 onClick={() => setActive(data.name)} className={`${hover} ${active === data.name ? 'border-b-2 border-orange-600' : 'border-transparent'} text-md border-b-2`}>{data.name}</h1>
            </div>
        ))}
      </div>
        <h1>{active}</h1>
        <Schedule data={data}/>
    </div>
  )
}

