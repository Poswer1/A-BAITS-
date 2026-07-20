import { useTranslation } from "@/app/context/TranslationProvider";
import { AlertTriangle } from "lucide-react";

interface InputFieldProps<T extends string | number> {
  label: string;
  value: T;
  type: string; 
  placeholder: string;
  onChange: (v: T) => void;
  maxLength?: number;
  textarea?: boolean;
  hTextArea?:number
  minTotal?:string
  error?: string | boolean
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
  error,
  onChange
}: InputFieldProps<T>) {

  const classInput = 'p-2 flex justify-start items-center outline-none rounded-m w-full';
  const stringValue = String(value); 

  const {t} = useTranslation()
  const minValue = minTotal ?? '0'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    if(type === 'number') {
      onChange((val === '' ? '' : Number(val)) as T)
    } else {
      onChange(val as T)
    }
  }

  console.log('в инпуте', minValue)

  return (
    <div className={`flex flex-col justify-start items-start w-full`}>
      <span className={`md:text-sm mb-1 ${error ? 'text-red-600 font-semibold' : 'text-black'}`}>{label}</span>
      <div className={`flex justify-start items-center w-full border rounded-lg ${error ? 'border-red-600 bg-red-600/10' : 'border-gray-300'} ${maxLength && stringValue.length > maxLength ? 'border-red-600 bg-red-600/10' : ''}`}>
        {textarea ? (
          <textarea
            placeholder={placeholder}
            value={stringValue}
            onChange={handleChange}
            className={`${classInput} h-${hTextArea} resize-none custom-scrollbar`}
          />
        ) : (
          <input
            type={type}
            min={minValue}
            placeholder={placeholder}
            autoComplete="new-password"
            value={stringValue}
            onChange={handleChange}
            className={classInput}
          />
        )}
        <AlertTriangle className={`${maxLength && stringValue.length > maxLength || error ? 'flex' : 'hidden'} text-red-600 mr-2`} size={20} />
      </div>

      {error && typeof error === 'string' && (
        <span className='text-red-600 text-sm mt-1'>{error}</span>
      )}

      {maxLength && (
        <div className={`flex justify-between items-center w-full mt-1`}>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{maxLength === 70 ? t('createLot', 'createLot-lengthName') : t('createLot', 'createLot-lengthdescriptions')}</span>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{stringValue.length}/{maxLength}</span>
        </div>
      )}
    </div>
  );
}
