'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getRelativeTime } from '../ui/relativeTime';
import { useTranslation } from '@/app/context/TranslationProvider';
import { useParams } from 'next/navigation';

interface ScheduleProps {
    data: {
        createdAt: string,
        total: number
    }[]
}

export default function Schedule({ data }: ScheduleProps) {

  const {t} = useTranslation()
  const params = useParams()
  const lang = params.lang as string

  const formattedData = data?.map(item => ({
      ...item,
      formattedDate: getRelativeTime(item.createdAt, lang),
      value:1
  })) 

  return (
    <LineChart width={800} height={400} data={formattedData} dataKey='value'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formattedDate"/>
        <YAxis />
        <Tooltip />
        <Line type="linear" dataKey="startPrice" name="Цена" stroke="#ea580c" activeDot={{ r: 8 }} />
    </LineChart>
  )
}

