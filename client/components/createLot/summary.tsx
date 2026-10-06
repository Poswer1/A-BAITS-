import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import { button } from "@/styles/global";
import { animationOpacity, hover } from "@/styles/style";

interface Summary {
    handleCreateOrUpdate: () => void
    mode: 'create' | 'edit' | 'editAdmin', 
}

export default function Summary({handleCreateOrUpdate, mode } : Summary) {

    const {t} = useTranslation()


  return (
    <div className={`${block} gap-1`}>
      <button onClick={handleCreateOrUpdate} className={`${button} ${hover} `}>{mode === 'create' ? t('createLot','create-post-lot') : t('createLot', 'create-update-lot')}</button>
    </div>
  )
}

