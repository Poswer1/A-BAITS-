import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import CheckBox from "@/components/ui/checkBox";

interface checkBoxProps {
    check:boolean,
    setCheck: (t:boolean) => void
    mode:string
}

export default function CheckBoxSections({check, setCheck, mode }:checkBoxProps) {

    const {t} = useTranslation()

  return (
    <div className={block}>
        <div className={Blockinput}>
            <div className="flex flex-col md:flex-row justify-start items-start gap-2">
              {/* <span className="bg-orange-600 text-white py-1 px-2 text-sm rounded-md md:hidden">{t('global','PaidFeature')}</span> */}
              <span className={`${nameInput}`}>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension') : 'Рекалма'}</span>
              {mode === 'advertising' && (
                 <span className="bg-orange-600 text-white px-2 text-sm rounded-md hidden md:flex">{t('global','PaidFeature')}</span>
              )}
            </div>
            <p className='text-gray-500 text-sm'>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension-descriptions') : t('createLot','create-advertising-descriptions')}</p>
            <CheckBox setCheck={setCheck}/>
        </div>
    </div>
  )
}

