import AvatarBlock from '@/components/ui/avatar'
import Link from 'next/link'
import Rating from '@/components/review/rating'
import { ReviewTypes } from '@/types/types'
import { getReviewUser } from '@/services/review'
import { getRelativeTime } from '@/components/ui/relativeTime'
import Pagination from '@/components/ui/pagination'
import ReviewBlock from '@/components/review/reviewBlock'

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
    <div className={`flex flex-col w-full`}>
      <h1 className='px-2 mb-4 md:p-0'>Найдено: {date.totalReview}</h1>
      {date?.allReview.map((review) => (
        <ReviewBlock review={review}/>
      ))}

      <Pagination total={date?.totalReview} maxLot={4}/>

    </div>
  )
}

export default page
