import { useTranslation } from "@/app/context/TranslationProvider";

import { block, Blockinput, nameInput } from "@/styles/createLot";

import CheckBox from "@/components/ui/checkBox";

interface CheckBoxProps {
  check: boolean;
  setCheck: (t: boolean) => void;
}

export default function CheckBoxSections({ check, setCheck }: CheckBoxProps) {
  const { t } = useTranslation();

  return (
    <div className={block}>
      <div className={Blockinput}>
        <span className={nameInput}>
          {t("createLot", "create-autoReExtension")}
        </span>

        <p className="text-gray-500 text-sm">
          {t("createLot", "create-autoReExtension-descriptions")}
        </p>

        <CheckBox setCheck={setCheck} />
      </div>
    </div>
  );
}