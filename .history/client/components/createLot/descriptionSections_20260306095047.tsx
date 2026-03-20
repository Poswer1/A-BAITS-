import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import { AlertTriangle} from "lucide-react"

interface DescriptionSectionsProps {
    description: string,
    setDescription: (t:string) => void
}

export default function DescriptionSections({description, setDescription}:DescriptionSectionsProps) {

    const {t} = useTranslation() 

  return (
    <div className={block}>
        <div className={Blockinput}>
           <span className={nameInput}>{t('createLot','createLot-descriptions')}</span>
           <div className={`flex justify-start items-start rounded-md w-full ${description.length > 1200 ? 'border-orange-600 bg-orange-600/10' : 'border-gray-500'} border`}>
              <textarea placeholder={t('createLot','createLot-descriptions')} value={description} onChange={(e) => setDescription(e.target.value)} className={`${input} p-2 resize-none h-70`}/>
              <AlertTriangle className={`${description.length > 1200 ? 'flex' : 'hidden'} text-orange-600 mr-2 mt-2`}/>
           </div>
           <div className={`flex justify-between items-center w-full`}>
              <span className={`${nameInput} ${description.length > 1200 ? 'text-red-500' : 'text-gray-500'}`}>{t('createLot',`createLot-lengthdescriptions`)}</span>
              <span className={`${nameInput} ${description.length > 1200 && 'text-orange-600'}`}>{description.length}/1200</span>
           </div>
        </div>
      </div> 
  )
}


