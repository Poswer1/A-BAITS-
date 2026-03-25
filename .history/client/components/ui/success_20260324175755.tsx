import { useTranslation } from "@/app/context/TranslationProvider";
import { hover } from "@/styles/style";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessProps {
    title:string
}

export default function Success({title}: SuccessProps) {

    const router = useRouter()
    const {t} = useTranslation()

    const back = () => {
        router.back()
    }
  return (
    <div className=`flex justify-center items-center w-full md:min-h-200`>
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 bg-white h-100 rounded-xl gap-1">
        <Check className="text-green-600" size={90}/>
        <h1 className="text-2xl text-center">{title}</h1>
        <span onClick={back} className={`border-b ${hover} text-gray-500 text-center`}>{t('global', 'back')}</span>
      </div>
    </div>
  )
}

