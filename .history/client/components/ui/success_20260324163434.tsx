import { hover } from "@/styles/style";
import { Check } from "lucide-react";

interface SuccessProps {
    title:string
}

export default function Success({title}: SuccessProps) {

    const router = useRoter

  return (
    <div className="flex justify-center items-center w-full min-h-200">
      <div className="flex flex-col justify-center items-center w-1/3 bg-white h-100 rounded-xl gap-1">
        <Check className="text-green-600" size={90}/>
        <h1 className="text-2xl">Спасибо! Лот успешно создан и опубликован</h1>
        <span className={`border-b ${hover} text-gray-500`}>Вернуться назад</span>
      </div>
    </div>
  )
}

