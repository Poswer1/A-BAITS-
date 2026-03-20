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
            <div className="flex justify-start items-center gap-2">
              <span className={`${nameInput}`}>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension') : 'Рекалма'}</span>
            </div>
            <p className='text-gray-500 text-sm'>{mode === 'autoReExtension' ? t('createLot','create-autoReExtension-descriptions') : t('createLot','create-advertising-descriptions')}</p>
            <CheckBox setCheck={setCheck}/>
        </div>
    </div>
  )
}

