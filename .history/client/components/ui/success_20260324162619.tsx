import { Check } from "lucide-react";

interface Success

export default function Success() {
  return (
    <div className="flex justify-center items-center w-full min-h-200">
      <div className="flex justify-center items-center w-1/3">
        <Check className="text-green-600" size={70}/>
        <h1></h1>
      </div>
    </div>
  )
}

