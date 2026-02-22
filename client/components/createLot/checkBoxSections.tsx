import { useTranslation } from "@/app/context/TranslationProvider";
import { block, Blockinput, nameInput } from "@/styles/createLot";
import CheckBox from "@/utils/checkBox";

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
            <span className={nameInput}>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension') : 'Рекалма'} </span>
            <p className={nameInput}>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension-descriptions') : t('createLot','create-advertising-descriptions')} <span className="font-bold text-orange-600">{t('global','PaidFeature')}</span></p>
            <CheckBox setCheck={setCheck}/>
        </div>
    </div>
  )
}

