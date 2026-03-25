import AvatarBlock from '@/components/ui/avatar'
import Link from 'next/link'
import Rating from '@/components/ui/rating'
import { ReviewTypes } from '@/types/types'
import { getReviewUser } from '@/services/review'
import { getRelativeTime } from '@/components/ui/relativeTime'
import Pagination from '@/components/ui/pagination'
import { BASE_URL } from '@/services/utils'

interface pageProps {
  params: {
    lang:string,
    username:string
  },
  searchParams: {
    page?:number
  }
}

async function page({params, searchParams}: pageProps) {

  const param = await params
  const search = await searchParams

  const lang = param.lang as string
  const name = decodeURIComponent(param.username as string)
  
  let date:{allReview: ReviewTypes[], totalReview: number} = {
    allReview:[], 
    totalReview: 0
  }

  try {
    date = await getReviewUser(name, Number(search.page))
  } catch (error) {
    date = {allReview:[], totalReview: 0}
  }

  return (
    <div className={`flex gap-2 flex-col w-full`}>
      <h1>Найдено: {date.totalReview}</h1>
      {date?.allReview.map((review) => (
        <div className="flex flex-col justify-center items-start gap-2 bg-white p-4 rounded-md w-full">
          <Link href={`/${lang}/profile/${review.from?.name}`} className="flex justify-center items-center gap-2 cursor-pointer">
            <AvatarBlock avatar={review.from?.avatar} size="32"/> 
            <span className="text-sm">{review.from?.name}</span>
          </Link>
          <div className='flex justify-center items-center gap-1'>
          <Rating rating={review.rating} size={16}/>
          </div>
          <span className='text-sm'>Про лот</span>
          <img src={`${BASE_URL}${}`}/>
          <p className="text-sm">{review.comment}</p>
          <span className='text-sm text-gray-500'>{getRelativeTime(review.createdAt, lang)}</span>
        </div>
      ))}

      <Pagination total={date?.totalReview} maxLot={4}/>

    </div>
  )
}

export default page
