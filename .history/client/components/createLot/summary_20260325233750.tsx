import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import { button } from "@/styles/global";
import { animationOpacity, hover } from "@/styles/style";

interface Summary {
    autoReExtension:boolean,
    advertising: boolean,
    handleCreateOrUpdate: () => void
    message:string
    errorRef:React.RefObject<HTMLDivElement>;
}

export default function Summary({autoReExtension, advertising, handleCreateOrUpdate, message, errorRef} : Summary) {

    const {t} = useTranslation()

    let summaryPrice = 0

    if(autoReExtension) {
      summaryPrice += 20
    }
    if(advertising) {
      summaryPrice += 20
    }

  return (
    <div ref={errorRef} className={`${block} gap-1`}>
      <h1 className="font-bold text-md">{t('createLot','create-Total-Amount')}: <span className="text-orange-600">{summaryPrice} ₴</span></h1>
      <span className='text-black'>{t('createLot','create-SelectedPrivileges')}</span>
      {autoReExtension && (
        <span className={`text-gray-500 text-sm ${animationOpacity}`}>{t('createLot','create-autoReExtension')} - <span className="text-orange-600">10 ₴</span></span>
      )}
      {advertising && (
        <span className={`text-gray-500 text-sm ${animationOpacity}`}>Реклама - <span className="text-orange-600">20 ₴</span></span>
      )}
      <button onClick={handleCreateOrUpdate} className={`${button} ${hover} `}>{t('createLot','create-post-lot')}</button>
      {message && (
        <span className="text-red-500">{message}</span>
      )}
    </div>
  )
}

