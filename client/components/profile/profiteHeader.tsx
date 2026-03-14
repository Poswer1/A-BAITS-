import { blockClass } from "@/styles/profile/profile";
import OlnlineUser from "../utils/onlineUser";
import AvatarBlock from "../utils/avatar";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "@/app/context/TranslationProvider";
import Rating from "../utils/rating";

export default function ProfiteHeader({user} : {user: any}) {

  const {t} = useTranslation()

  return (
    <div className={`${blockClass}`}>
        <AvatarBlock avatar={user?.avatar } size="80"/>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-lg">{user?.name }</h1>
            <OlnlineUser id={user?.id}/>
          </div>
          <Rating rating={user?.rating} showRatingNumber={true} size={18}/>
        <span className="flex text-sm justify-center items-center gap-1 text-base bg-red-500/20  text-red-500 p-1 rounded-md"><AlertTriangle size={18}/>{t('profile', 'LotsOfComplaints')}</span>
    </div>
  )
}

