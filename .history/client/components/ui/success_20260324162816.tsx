import { Check } from "lucide-react";

interface SuccessProps {
    title:string
}

export default function Success({title}: SuccessProps) {
  return (
    <div className="flex justify-center items-center w-full min-h-200">
      <div className="flex justify-center items-center w-1/3">
        <Check className="text-green-600" size={70}/>
        <h1>Товар </h1>
      </div>
    </div>
  )
}

