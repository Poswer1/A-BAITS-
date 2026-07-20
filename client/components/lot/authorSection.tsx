import { useTranslation } from "@/app/context/TranslationProvider";
import { button } from "@/styles/global";
import { columnBlock } from "@/styles/lot";
import { hover } from "@/styles/style";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AvatarBlock from "../ui/avatar";
import { useParams } from "next/navigation";
import Link from 'next/link';
import Rating from "../review/rating";
import { LotTypes, ReviewTypes } from "@/types/types";
import { getRandomReview } from "@/services/review";
import Online from "../ui/onlineUser";

interface AuthorSectionProps {
 lot: LotTypes | null,
}

export default function AuthorSection({lot}:AuthorSectionProps) {

    const params = useParams()
    const lang = params.lang as string
    
    const [review, setReview] = useState<ReviewTypes | null>(null)

    const {t} = useTranslation()

    useEffect(() => {
      if(!lot?.author._id) return
      getRandomReview(lot?.author._id)
      .then(data => {
        setReview(data)
      })
    }, [lot?.author._id])

    if (!lot) return null

  return (
    <div className={`${columnBlock} w-full text-black`}>
        <h1 className='font-bold'>Автор</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-2 border-b pb-2 border-gray-300">
            <Link href={`/${lang}/profile/${lot.author.name}`} className="flex justify-between items-center gap-2 cursor-pointer">
                <AvatarBlock avatar={lot.author.avatar} size="45"/>
                <div className="flex flex-col justify-start items-start">
                  <span>{lot.author.name}</span>
                    <Online id={lot.author._id}/>
                </div>
            </Link>
          <Rating rating={lot.author.rating} showRatingNumber={true} size={16}/>
        </div>
           {/* <Link href={`/${lang}/profile/chat?id=${lot.author._id}&lotId=${lot.lotNumber}`} className={`${button} gap-1 !w-full text-md ${hover}`}>{t('lot', 'lot-message')}<MessageCircle size={17}/></Link> */}
            <h1 className='font-bold mt-3'>{t('lot', 'lot-lastReview')}</h1>
            {review ? (
                <div className="flex flex-col justify-center items-start gap-2">
                    <div className="flex justify-center items-center gap-2 cursor-pointer">
                        <AvatarBlock avatar={review?.from?.avatar} size="32"/>
                        <span className="text-sm">{review?.from?.name}</span>
                    </div>
                    <Rating rating={review?.rating} size={14}/>
                    <p className="text-sm">{review?.comment}</p>
                    <Link href={`/${lang}/profile/${lot.author.name}/reviews`} className={`${hover} flex gap-1 text-orange-600`}>Перейти ко всем отзывам <ArrowRight /></Link>
                </div>
              
            ): (
              <h1 className="text-gray-500">{t('lot', 'reviewNotFound')}</h1>
            )}
           
     </div>
  )
}
