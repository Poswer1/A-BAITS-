import AvatarBlock from '@/components/utils/avatar'
import Link from 'next/link'
import Rating from '@/components/utils/rating'
import { ReviewTypes } from '@/types/types'

interface pageProps {
  params: {
    lang:string,
    name:string
  },
  searchParams: {
    page: number
  }
}

async function page({params, searchParams}: pageProps) {

  const param = await params
  const search = await searchParams

  const lang = param.lang as string
  const name = decodeURIComponent(param.name as string)
  
  const data:{allReview: ReviewTypes[], totalReview: 0} = {allReview:[], totalReview: 0}

  try {
    
  } catch (error) {
    
  }

  return (
    <div className={`flex gap-5 flex-col`}>
      {Array.from({length: 5}).map(() => (
        <div className="flex flex-col justify-center items-start gap-2 bg-white p-4 rounded-md">
          <Link href={`/${lang}/profile/${'Могучее зерно'}`} className="flex justify-center items-center gap-2 cursor-pointer">
            <AvatarBlock avatar={'https://img.freepik.com/free-photo/successful-bearded-fisherman-standing-blue-wall-with-his-catch-having-happy-expression-handsome-young-man-holding-long-heavy-fish-hands-feeling-proud-excited_273609-8096.jpg?semt=ais_hybrid&w=740&q=80'} size="32"/> 
            <span className="text-sm">{'Могучее зерно'}</span>
          </Link>
          <div className='flex justify-center items-center gap-1'>
          <Rating rating={3} size={16}/>
          </div>
          <p className="text-sm">Отличный продавец! Товары для рыбалки пришли быстро и в идеальном состоянии. Всё соответствует описанию, качество на высоте. Общение лёгкое, продавец всегда на связи и готов помочь с выбором. Буду заказывать ещё!</p>
          <span className='text-sm text-gray-500'>1 день назад</span>
        </div>
      ))}

    </div>
  )
}

export default page
