import { useTranslation } from "@/app/context/TranslationProvider";
import { animationOpacity, hover } from "@/styles/style";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessProps {
    title:string
    mode?: string
}

export default function Success({title, mode}: SuccessProps) {

    const router = useRouter()
    const {t} = useTranslation()

    const back = () => {
        router.back()
    }

    const updateWindow = () => {
      window.location.reload()
    }

  return (
    <div className={`${animationOpacity} flex justify-center items-center w-full md:h-full`}>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 xl:w-1/3 bg-white h-100 rounded-xl gap-1">
        <Check className="text-green-600" size={90}/>
        <h1 className="text-2xl text-center">{title}</h1>
        <div className="flex gap-3">
            <span onClick={back} className={`border-b ${hover} text-gray-500 text-center`}>{t('global', 'back')}</span>
            {mode === 'lot' && (
              <span onClick={updateWindow} className={`${hover} text-orange-600`}>Создать новый лот</span>
            )}
        </div>
      </div>
    </div>
  )
}

