import { blockClass } from "@/styles/profile/profile";
import OlnlineUser from "../ui/onlineUser";
import AvatarBlock from "../ui/avatar";
import { AlertTriangle, Ban } from "lucide-react";
import { useTranslation } from "@/app/context/TranslationProvider";
import Rating from "../review/rating";
import { UserTypes } from "@/types/types";

interface ProfiteHeaderProps {
  user:UserTypes
}

export default function ProfiteHeader({user}: ProfiteHeaderProps) {

  const {t} = useTranslation()

  return (
    <div className={`flex w-full p-2 bg-white justify-start gap-5 rounded-md flex-col items-start md:items-center md:flex-row`}>
        <div className="flex justify-center items-center gap-5">
          <AvatarBlock avatar={user?.avatar } size="80"/>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-lg">{user?.name }</h1>
            <OlnlineUser id={user?._id}/>
          </div>
        </div>
          <Rating rating={user?.rating} showRatingNumber={true} size={18}/>
          {user.status === 'Blocked' ? (
            <span className="bg-red-500/10 p-2 flex justify-center gap-1 rounded-xl border border-red-500/50 text-red-500 w-full md:w-auto"><Ban /> {t('global', 'blocked')}</span>
          ) : user.status === 'Temporary' ? (
            <span className="bg-yellow-500/10 p-2 flex justify-center gap-1 rounded-xl border border-yellow-500/50 text-yellow-500 w-full md:w-auto"><AlertTriangle /> {t('global', 'Temparary')}</span>
          ) : null}
        {/* <span className="flex text-sm justify-center items-center gap-1 text-base bg-red-500/20  text-red-500 p-1 rounded-md"><AlertTriangle size={18}/>{t('profile', 'LotsOfComplaints')}</span> */}
    </div>
  )
}

