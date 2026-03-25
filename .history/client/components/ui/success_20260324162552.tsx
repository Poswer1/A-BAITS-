import { Check } from "lucide-react";

export default function Success() {
  return (
    <div className="flex justify-center items-center w-full min-h-200">
      <div className="flex justify-center items-center w-1/3">
        <Check className="text-green-500"/>
      </div>
    </div>
  )
}

