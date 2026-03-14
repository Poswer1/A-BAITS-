import { useTranslation } from "@/app/context/TranslationProvider";
import { avatarBlock, button } from "@/styles/global";
import { columnBlock } from "@/styles/lot";
import { hover } from "@/styles/style";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import AvatarBlock from "../utils/avatar";
import { useParams } from "next/navigation";
import Link from 'next/link';
import OlnlineUser from "../utils/onlineUser";
import Rating from "../utils/rating";

export default function AuthorSection({lot}:any) {

    const params = useParams()
    const lang = params.lang as string

    const {t} = useTranslation()

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
            <h1 className='font-bold mt-3'>{t('lot', 'lot-lastReview')}</h1>
            <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <AvatarBlock avatar={lot.author.avatar} size="32"/>
                    <span className="text-sm">{lot.author.name}</span>
                </div>
                <Rating rating={3} size={14}/>
                <p className="text-sm">Отличный продавец! Товары для рыбалки пришли быстро и в идеальном состоянии. Всё соответствует описанию, качество на высоте. Общение лёгкое, продавец всегда на связи и готов помочь с выбором. Буду заказывать ещё!</p>
                <Link href={`/${lang}/profile/${lot.a}`} className={`${hover} flex gap-1 text-orange-600`}>Перейти ко всем отзывам <ArrowRight /></Link>
            </div>
     </div>
  )
}
