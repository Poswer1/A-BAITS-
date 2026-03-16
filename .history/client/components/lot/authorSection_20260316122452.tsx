import { useTranslation } from "@/app/context/TranslationProvider";
import { avatarBlock, button } from "@/styles/global";
import { columnBlock } from "@/styles/lot";
import { hover } from "@/styles/style";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AvatarBlock from "../ui/avatar";
import { useParams } from "next/navigation";
import Link from 'next/link';
import OlnlineUser from "../ui/onlineUser";
import Rating from "../ui/rating";
import { ReviewTypes } from "@/types/types";
import { getRandomReview } from "@/services/review";

export default function AuthorSection({lot}:any) {

    const params = useParams()
    const lang = params.lang as string
    
    const [review, setReview] = useState<ReviewTypes | null>(null)

    const {t} = useTranslation()

    useEffect(() => {
      if(!lot.author._id) return
      getRandomReview(lot.author._id)
      .then(data => {
        setReview(data)
      })
    }, [lot.author._id])

  return (
    <div className={`${columnBlock} w-full`}>
        <h1 className='font-bold'>Автор</h1>
        <div className="flex justify-between items-center w-full">
            <Link href={`/${lang}/profile/${lot.author.name}`} className="flex justify-between items-center gap-2 cursor-pointer">
                <AvatarBlock avatar={lot.author.avatar} size="45"/>
                <div className="flex flex-col justify-start items-start">
                  <span>{lot.author.name}</span>
                    <OlnlineUser id={lot}/>
                </div>
            </Link>
          <Rating rating={lot.author.rating} showRatingNumber={true} size={16}/>
        </div>
           <Link href={`/${lang}/profile/chat?id=${lot.author._id}&lotId=${lot.lotNumber}`} className={`${button} gap-1 !w-full text-md ${hover}`}>{t('lot', 'lot-message')} {lot.author.name}<MessageCircle size={17}/></Link>
            {review && (
              
            )}
            <h1 className='font-bold mt-3'>{t('lot', 'lot-lastReview')}</h1>
            <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <AvatarBlock avatar={review?.from.avatar} size="32"/>
                    <span className="text-sm">{review?.from.name}</span>
                </div>
                <Rating rating={review?.rating} size={14}/>
                <p className="text-sm">{review?.comment}</p>
                <Link href={`/${lang}/profile/${lot.author.name}/reviews`} className={`${hover} flex gap-1 text-orange-600`}>Перейти ко всем отзывам <ArrowRight /></Link>
            </div>
     </div>
  )
}
