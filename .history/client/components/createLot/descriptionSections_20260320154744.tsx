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
        
      </div> 
  )
}


