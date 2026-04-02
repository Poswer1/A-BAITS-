'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getRelativeTime } from '../ui/relativeTime';
import { useTranslation } from '@/app/context/TranslationProvider';

interface ScheduleProps {
    data: {
        createdAt: string,
        total: number
    }[]
}

export default function Schedule({ data }: ScheduleProps) {

  const {t} = useTranslation()
  const params = await u

  data.map(item => ({
      ...item,
      startPrice: item.total,
      formattedDate: getRelativeTime(item.createdAt, )
  })) 

  return (
    <LineChart width={800} height={400} data={data} dataKey='startPrice'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt"/>
        <YAxis />
        <Tooltip />
        <Line type="linear" dataKey="startPrice" stroke="#ea580c" activeDot={{ r: 8 }} />
    </LineChart>
  )
}

