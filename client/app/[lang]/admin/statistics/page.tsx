'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import Schedule from "@/components/admin/Schedule"
import { getAllTurnover, getLotsCount } from "@/services/admin/lots"
import { getCountRegisteredUsers, getUserCount } from "@/services/admin/user"
import { hover } from "@/styles/style"
import { useEffect, useState } from "react"

interface DateProps {
    day: {
        createdAt:Date
        startPrice:number
    }[],
    week: {
        createdAt:Date
        startPrice:number
    }[],
    month: {
        createdAt:Date
        startPrice:number
    }[],
}

type Timeframe = 'day' | 'week' | 'month'

export default function page() {

    const {t} = useTranslation()

    const [allTurnover, setAllTurnover] = useState<DateProps | null>(null)
    const [registeredUsers, setRegisteredUsers] = useState<DateProps | null>(null)
    const [lotsCount, setLotsCount] = useState<DateProps | null>(null)
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('week');

    useEffect(() => {
        getAllTurnover()
        .then(data => {
            setAllTurnover(data)
        })

        getCountRegisteredUsers()
        .then(data => {
            setRegisteredUsers(data)
        })

        getLotsCount()
        .then(data => {
            setLotsCount(data)
        })

    }, [selectedTimeframe])

    const listTimeframe: { name: string; value: Timeframe }[] = [
        {name: t('admin', 'Day'), value: 'day'},
        {name: t('admin', 'Week'), value: 'week'},
        {name: t('admin', 'Month'), value: 'month'},
    ]

  return (
    <div className="flex flex-col justify-center items-start w-full md:gap-2">
    <h1 className="text-xl p-2 md:p-0">{t('admin', 'Statistics')}</h1>
      <div className="flex justify-start items-center w-full gap-5">
      </div>
        <div className="flex justify-center items-center gap-5 p-2 md:p-0">
            {listTimeframe.map(item => (
                <span onClick={() => setSelectedTimeframe(item.value)} className={`${hover} ${selectedTimeframe === item.value ? 'text-orange-600' : 'text-gray-600'}`}>{item.name}</span>
            ))}
        </div>
        <div className="flex flex-col justify-start items-center w-full gap-5">
            <Schedule 
            data={(allTurnover?.[selectedTimeframe] || []).map(item => ({
                ...item,
                createdAt: item.createdAt.toString()
            }))}
            title={t('admin', 'TotalTurnover')}
            />
            <Schedule 
            data={(registeredUsers?.[selectedTimeframe] || []).map(item => ({
                ...item,
                createdAt: item.createdAt.toString()
            }))}
            title={t('admin', 'CountRegisteredUsers')}
            />
            <Schedule 
            data={(lotsCount?.[selectedTimeframe] || []).map(item => ({
                ...item,
                createdAt: item.createdAt.toString()
            }))}
            title={ t('admin', 'Lots')}
            />
            </div>
    </div>
  )
}

