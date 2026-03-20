import { AlertTriangle } from "lucide-react";

interface InputFieldProps {
  label: string;
  value: string | number;
  type: string; 
  placeholder: string;
  onChange: (v: string | number) => void;
  maxLength?: number;
  textarea?: boolean;
  hTextArea?:number
  minTotal?:string
}

export default function InputField({
  label,
  value,
  placeholder,
  type,
  maxLength,
  textarea,
  hTextArea,
  minTotal,
  onChange
}: InputFieldProps) {

  const classInput = 'p-2 flex justify-start items-center outline-none rounded-m w-full';
  const stringValue = String(value); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(type === 'number') {
      onChange(Number(e.target.value));
    } else {
      onChange(e.target.value);
    }
  }

  console.log('в инпуте', minTotal)

  return (
    <div className={`flex flex-col justify-start items-start w-full`}>
      <span className={'text-black text-sm mb-1'}>{label}</span>
      <div className={`flex justify-start items-center w-full bg-gray-100 ${maxLength && stringValue.length > maxLength ? 'border-red-600 bg-red-600/10' : ''} rounded-md `}>
        {textarea ? (
          <textarea
            placeholder={placeholder}
            value={stringValue}
            onChange={handleChange}
            className={`${classInput} h-${hTextArea} resize-none`}
          />
        ) : (
          <input
            type={type}
            min={minTotal || 0}
            placeholder={placeholder}
            value={stringValue}
            onChange={handleChange}
            className={classInput}
          />
        )}
        <AlertTriangle className={`${maxLength && stringValue.length > maxLength ? 'flex' : 'hidden'} text-red-600 mr-2`} />
      </div>

      {maxLength && (
        <div className={`flex justify-between items-center w-full`}>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{maxLength === 70 ? t('createLot', 'createLot-lengthName')}</span>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-red-600'}`}>{stringValue.length}/{maxLength}</span>
        </div>
      )}
    </div>
  );
}