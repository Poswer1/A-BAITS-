

interface CheckBoxProps {
  setCheck: (value: boolean) => void;
}

export default function CheckBox({ setCheck }: CheckBoxProps) {
  return (
    <label className="relative inline-block w-12 h-6">
        <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} className="opacity-0 w-0 h-0 peer"/>
        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all peer-checked:bg-orange-600`}></span>
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
    </label>
  )
}


