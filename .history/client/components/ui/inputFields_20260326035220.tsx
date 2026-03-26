import { useTranslation } from "@/app/context/TranslationProvider";
import { AlertTriangle } from "lucide-react";

interface InputFieldProps<T extends string | number> {
  label: string;
  value: string | number;
  type: string; 
  placeholder: string;
  onChange: (v: T) => void;
  maxLength?: number;
  textarea?: boolean;
  hTextArea?:number
  minTotal?:string
}

export default function InputField<T extends string | number>({
  label,
  value,
  placeholder,
  type,
  maxLength,
  textarea,
  hTextArea,
  minTotal,
  onChange
}: InputFieldProps<T>) {

  const classInput = 'p-2 flex justify-start items-center outline-none rounded-m w-full';
  const stringValue = String(value); 

  const {t} = useTranslation()

  console.log('в инпуте', minTotal)

  return (
    <div className={`flex flex-col justify-start items-start w-full`}>
      <span className={'text-black md:text-sm mb-1'}>{label}</span>
      <div className={`flex justify-start items-center w-full border border-gray-300 ${maxLength && stringValue.length > maxLength ? 'border-red-600 bg-red-600/10' : ''} rounded-lg `}>
        {textarea ? (
          <textarea
            placeholder={placeholder}
            value={stringValue}
            onChange={(e) => e.target.value}
            className={`${classInput} h-${hTextArea} resize-none custom-scrollbar`}
          />
        ) : (
          <input
            type={type}
            min={minTotal || 0}
            placeholder={placeholder}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            className={classInput}
          />
        )}
        <AlertTriangle className={`${maxLength && stringValue.length > maxLength ? 'flex' : 'hidden'} text-red-600 mr-2`} />
      </div>

      {maxLength && (
        <div className={`flex justify-between items-center w-full mt-1`}>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{maxLength === 70 ? t('createLot', 'createLot-lengthName') : t('createLot', 'createLot-lengthdescriptions')}</span>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{stringValue.length}/{maxLength}</span>
        </div>
      )}
    </div>
  );
}