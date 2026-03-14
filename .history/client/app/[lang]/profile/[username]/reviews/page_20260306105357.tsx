'use client'

import AvatarBlock from '@/components/utils/avatar'
import { blockClass } from '@/styles/profile/profile'
import { Star } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function page() {

  const [allReviews, setAllReviews] = useState()
  const params = useParams()
  const lang = params.lang as string

  return (
    <div className={`flex gap-5 flex-col`}>
      {Array.from({length: 5}).map(() => (
        <div className="flex flex-col justify-center items-start gap-2 bg-white p-4 rounded-md">
          <Link href={`/${lang}/profile/${'Могучее зерно'}`} className="flex justify-center items-center gap-2 cursor-pointer">
            <AvatarBlock avatar={'https://img.freepik.com/free-photo/successful-bearded-fisherman-standing-blue-wall-with-his-catch-having-happy-expression-handsome-young-man-holding-long-heavy-fish-hands-feeling-proud-excited_273609-8096.jpg?semt=ais_hybrid&w=740&q=80'} size="32"/> 
            <span className="text-sm">{'Могучее зерно'}</span>
          </Link>
          <div className='flex justify-center items-center gap-1'>
          {Array.from({length: 5}).map((_, index) => (
            <Star
              size={15}
              key={index}
              className={index > 0 ? 'text-orange-600' : 'text-gray-300'}
            />
          ))}
          </div>
          <p className="text-sm">Отличный продавец! Товары для рыбалки пришли быстро и в идеальном состоянии. Всё соответствует описанию, качество на высоте. Общение лёгкое, продавец всегда на связи и готов помочь с выбором. Буду заказывать ещё!</p>
          <span className='text-sm text-gray-500'>1 день назад</span>
        </div>
      ))}

    </div>
  )
}

export default page
