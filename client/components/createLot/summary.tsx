import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import { button } from "@/styles/global";
import { animationOpacity, hover } from "@/styles/style";

interface Summary {
    autoReExtension:boolean,
    advertising: boolean,
    handleCreateOrUpdate: () => void
    mode: 'create' | 'edit' | 'editAdmin', 
}

export default function Summary({advertising, handleCreateOrUpdate, mode } : Summary) {

    const {t} = useTranslation()

    let summaryPrice = 0

    if(advertising) {
      summaryPrice += 20
    }

  return (
    <div className={`${block} gap-1`}>
      <h1 className="font-bold text-md">{t('createLot','create-Total-Amount')}: <span className="text-orange-600">{summaryPrice} ₴</span></h1>
      <span className='text-black'>{t('createLot','create-SelectedPrivileges')}</span>
      {advertising && (
        <span className={`text-gray-500 text-sm ${animationOpacity}`}>Реклама - <span className="text-orange-600">20 ₴</span></span>
      )}
      <button onClick={handleCreateOrUpdate} className={`${button} ${hover} `}>{mode === 'create' ? t('createLot','create-post-lot') : t('createLot', 'create-update-lot')}</button>
    </div>
  )
}

