import { useState } from "react"
import { Image, ChevronRight, ChevronLeft} from "lucide-react";
import { animationOpacity, hover } from "@/styles/style";


export default function PhotoSection({lot}:any) {

    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [selectPhoto, setSelectPhoto] = useState(0)
    const arrow = 'bg-black/50 rounded-full text-white p-2 w-10 h-10'

    const handleNext = () => {
        setSelectPhoto((prev) => (prev + 1) % lot.images.length)
    }

    const handleBack = () => {
        setSelectPhoto((prev) => (prev - 1 + lot.images.length) % lot.images.length)
    }

    if(!lot) return

  return (
    <div className="flex flex-col justify-center items-center w-1/2 gap-2">
        <div className="flex justify-center items-center w-full h-130 relative overflow-hidden rounded-t-md">
            <div className="w-full h-full blur-[10px] brightness-75 absolute z-0" style={{backgroundImage: `url(${BASE_URL}${lot.images[selectPhoto]})`, backgroundSize: 'cover',}}></div>
            <img src={`${BASE_URL}${lot.images[selectPhoto]}`} className={`w-1/2 h-full z-10 ${animationOpacity}`}/>
            <div className='bg-black/50 p-2 absolute bottom-2 right-2 rounded-md flex gap-2 justify-center items-center'>
                <Image className="text-white"/>
                <span className="text-white ">{selectPhoto + 1} / {lot.images.length}</span>
            </div>
            <div className="flex justify-between items-center absolute top-1/2 left-0 w-full">
                <ChevronLeft className={`${hover} ${arrow}`} onClick={handleBack}/>
                <ChevronRight className={`${hover} ${arrow}`} onClick={handleNext}/>
            </div>
        </div>
        <div className="w-full flex justify-start flex-wrap gap-5 items-center h-full">
            {lot.images.map((img, i) => (
                <img key={i} src={`${BASE_URL}${img}`} onClick={() => setSelectPhoto(i)} className={`${animationOpacity} w-1/7 rounded-md cursor-pointer border border-gray-300`}/>
            ))}
        </div>
     </div>
  )
}

