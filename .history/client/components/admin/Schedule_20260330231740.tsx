
interface ScheduleProps {
    data: {
        createdAt: Date,
        total: number
    }[]
}

export default function Schedule({ data }: ScheduleProps) {
  return (
    <LineCa width={800} height={400} data={data} dataKey='total'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#ea580c" activeDot={{ r: 8 }} />
    </LineChart>
  )
}

