import { useTranslation } from "@/app/context/TranslationProvider";
import { avatarBlock } from "@/styles/global";
import { columnBlock } from "@/styles/lot";
import { hover } from "@/styles/style";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import AvatarBlock from "../utils/avatar";


export default function AuthorSection({lot}:any) {

    const [onlineUser, setOnlineUser] = useState<any[]>([])
    const {t} = useTranslation()

  return (
    <div className={`${columnBlock} w-full`}>
        <h1 className='font-bold'>Автор</h1>
            <div className="flex justify-center items-center gap-2 cursor-pointer">
                {AvatarBlock(lot.author.avatar, '45')}
                <div className="flex flex-col justify-start items-start">
                  <span>{lot.author.name}</span>
                    <span className="text-sm flex justify-center items-center gap-1">
                        <span className={`${onlineUser.includes(lot.author.id) ? 'bg-green-600' : 'bg-red-500'} rounded-full p-1`}></span>
                        {onlineUser.includes(lot.author.id) ? 'Онлайн': 'Офлайн'}
                    </span>
                </div>
            </div>
       <h1 className='font-bold mt-3'>{t('lot', 'lot-lastReview')}</h1>
            <div className="flex flex-col justify-center items-start gap-2">
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                    {AvatarBlock(lot.author.avatar, '32')}
                    <span className="text-sm">{lot.author.name}</span>
                </div>
                <p className="text-sm">Отличный продавец! Товары для рыбалки пришли быстро и в идеальном состоянии. Всё соответствует описанию, качество на высоте. Общение лёгкое, продавец всегда на связи и готов помочь с выбором. Буду заказывать ещё!</p>
                <span className={`${hover} flex gap-1 text-orange-600`}>Перейти ко всем отзывам <ArrowRight /></span>
            </div>
     </div>
  )
}
