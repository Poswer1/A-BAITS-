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

    const [data, setData] = useState([])
    const [dataStatistics, setDataStatistics] = useState(0)
    const [selectedTimeframe, setSelectedTimeframe] = useState('week')
    const [active, setActive] = useState(t('admin', 'TotalTurnover'))

    useEffect(() => {
        if(active === t('admin', 'TotalTurnover')) {
            getAllTurnover()
            .then(data => {
                setData(data)
            })
        }
    }, [active])

    console.log('data', data.week)

    const mainData = [
        {name: t('admin', 'TotalTurnover'), price: true},
        {name: t('admin', 'CountRegisteredUsers')},
        {name: t('admin', 'Users')},
        {name: t('admin', 'Lots')},
    ]

    const listTimeframe = [
        {name: t('admin', 'Week'), value: 'week'},
        {name: t('admin', 'Month'), value: 'month'},
        {name: t('admin', 'Year'), value: 'year'},
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
        {active.length > 0 && (
            <div className="flex justify-center items-center gap-5">
                {listTimeframe.map(item => ())}
            </div>
        )}
        <h1 className="text-xl">{active}</h1>
        <Schedule data={data.month}/>
    </div>
  )
}

