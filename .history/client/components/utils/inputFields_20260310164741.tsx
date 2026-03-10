import { AlertTriangle } from "lucide-react";

interface InputFieldProps {
  label: string;
  value: string | number;
  type: string; // всегда строка: "text" | "number" | "email" и т.д.
  placeholder: string;
  onChange: (v: string | number) => void;
  maxLength?: number;
  minLengthText?: string;
  textarea?: boolean;
}

export default function InputField({
  label,
  value,
  placeholder,
  type,
  maxLength,
  textarea,
  minLengthText,
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

  return (
    <div className={`flex flex-col justify-start items-start w-full`}>
      <span className={'text-gray-500 text-sm'}>{label}</span>
      <div className={`flex justify-start items-center w-full ${maxLength && stringValue.length > maxLength ? 'border-orange-600 bg-orange-600/10' : 'border-gray-400'} rounded-md border`}>
        {textarea ? (
          <textarea
            placeholder={placeholder}
            value={stringValue}
            onChange={handleChange}
            className={`${classInput} h-70 resize-none`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={stringValue}
            onChange={handleChange}
            className={classInput}
          />
        )}
        <AlertTriangle className={`${maxLength && stringValue.length > maxLength ? 'flex' : 'hidden'} text-orange-600 mr-2`} />
      </div>

      {maxLength && (
        <div className={`flex justify-between items-center w-full`}>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-orange-600'}`}>{minLengthText}</span>
          <span className={`text-gray-500 text-sm ${stringValue.length > maxLength && 'text-orange-600'}`}>{stringValue.length}/{maxLength}</span>
        </div>
      )}
    </div>
  );
}