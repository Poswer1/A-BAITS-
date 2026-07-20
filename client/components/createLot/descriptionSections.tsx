import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import { AlertTriangle} from "lucide-react"
import InputField from "../ui/inputFields"

interface DescriptionSectionsProps {
    description: string,
    setDescription: (t:string) => void
    descriptionError?: string
}

export default function DescriptionSections({description, setDescription, descriptionError}:DescriptionSectionsProps) {

    const {t} = useTranslation() 

    const hTextArea = window.innerWidth <= 768 ? 50 : 70

  return (
    <div className={block}>
        <div className={Blockinput}>
           <InputField 
           label={t('createLot','createLot-descriptions')} 
           value={description} 
           type="text"
           placeholder={t('createLot','createLot-descriptions')} 
           onChange={setDescription} 
           textarea={true} 
           hTextArea={hTextArea}
          maxLength={1200}
          error={descriptionError}
          />
        </div>
   </div> 
  )
}


