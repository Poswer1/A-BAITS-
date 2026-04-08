'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';
import { getRelativeTime } from '../ui/relativeTime';
import { useTranslation } from '@/app/context/TranslationProvider';
import { useParams } from 'next/navigation';

interface ScheduleProps {
    data: {
        createdAt: string,
        total: number
    }[]
    title: string
}

export default function Schedule({ data, title}: ScheduleProps) {

  const {t} = useTranslation()
  const params = useParams()
  const lang = params.lang as string

  const formattedData = data?.map(item => ({
      ...item,
      formattedDate: getRelativeTime(item.createdAt, lang),
  })) 

  const useWith = title === t('admin', 'TotalTurnover') ? 'price' : 'count'

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-white p-2 md:p-5 md:rounded-xl flex flex-col gap-2">
        <h1 className='text-xl'>{title}</h1>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip />
            <Line
                type="linear"
                dataKey="value"
                name={useWith === 'price'
                ? t('admin', 'price')
                : useWith === 'count'
                ? t('admin', 'count')
                : ''
                }
                stroke="#ea580c"
                activeDot={{ r: 8 }}
            />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

