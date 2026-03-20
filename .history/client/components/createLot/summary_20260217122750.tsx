import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import { button } from "@/styles/global";
import { animationOpacity, hover } from "@/styles/style";

interface Summary {
    reservPrice:number,
    autoReExtension:boolean,
    advertising: boolean,
    handleCreateOrUpdate: () => void
    message:string
}

export default function Summary({reservPrice, autoReExtension, advertising, handleCreateOrUpdate, message} : Summary) {

    const {t} = useTranslation()

  return (
    <div className={`${block} gap-1`}>
      <h1 className="font-bold text-md">{t('createLot','create-Total-Amount')}: 50 ₴</h1>
      <span className='text-black'>{t('createLot','create-SelectedPrivileges')}</span>
      {autoReExtension && (
        <span className={`${nameInput} ${animationOpacity}`}>{t('createLot','create-autoReExtension')} - 10 ₴</span>
      )}
      {advertising && (
        <span className={`${nameInput} ${animationOpacity}`}>Реклама - 20 ₴</span>
      )}
      {reservPrice > 0 && (
        <span className={`${nameInput} ${animationOpacity}`}>{t('createLot','createLot-ReservePrice')} - 20 ₴</span>
      )}
      <button onClick={handleCreateOrUpdate} className={`${button} ${hover} `}>{t('createLot','create-post-lot')}</button>
      {message && (
        <span className="text-red-500">{message}</span>
      )}
    </div>
  )
}

