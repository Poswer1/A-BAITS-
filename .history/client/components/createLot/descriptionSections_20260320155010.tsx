import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import { AlertTriangle} from "lucide-react"
import InputField from "../ui/inputFields"

interface DescriptionSectionsProps {
    description: string,
    setDescription: (t:string) => void
}

export default function DescriptionSections({description, setDescription}:DescriptionSectionsProps) {

    const {t} = useTranslation() 

  return (
    <div className={block}>
      <InputField label={t('createLot','createLot-descriptions')} value={description} placeholder={t('createLot','createLot-descriptions')} onChange={setDescription} textarea={true} hTextArea='80' maxLength={1200}/>
      </div> 
  )
}


