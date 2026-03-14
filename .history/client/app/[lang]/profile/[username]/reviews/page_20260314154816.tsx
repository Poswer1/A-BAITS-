import AvatarBlock from '@/components/utils/avatar'
import Link from 'next/link'
import Rating from '@/components/utils/rating'
import { ReviewTypes } from '@/types/types'
import { getReviewUser } from '@/services/review'
import { getRelativeTime } from '@/components/utils/relativeTime'

interface pageProps {
  params: {
    lang:string,
    username:string
  },
  searchParams: {
    page: number
  }
}

async function page({params, searchParams}: pageProps) {

  const param = await params
  const search = await searchParams
  const currentPage = Number(page) || 1

  const lang = param.lang as string
  const name = decodeURIComponent(param.username as string)
  
  let date:{allReview: ReviewTypes[], totalReview: number} = {
    allReview:[], 
    totalReview: 0
  }

  try {
    date = await getReviewUser(name, currentPage)
  } catch (error) {
    date = {allReview:[], totalReview: 0}
  }

  return (
    <div className={`flex gap-5 flex-col`}>
      {date?.allReview.map((review) => (
        <div className="flex flex-col justify-center items-start gap-2 bg-white p-4 rounded-md">
          <Link href={`/${lang}/profile/${review.from?.name}`} className="flex justify-center items-center gap-2 cursor-pointer">
            <AvatarBlock avatar={review.from?.avatar} size="32"/> 
            <span className="text-sm">{review.from?.name}</span>
          </Link>
          <div className='flex justify-center items-center gap-1'>
          <Rating rating={3} size={16}/>
          </div>
          <p className="text-sm">{review.comment}</p>
          <span className='text-sm text-gray-500'>{getRelativeTime()}</span>
        </div>
      ))}

    </div>
  )
}

export default page
