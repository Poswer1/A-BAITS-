import { useState } from "react"
import { Image, ChevronRight, ChevronLeft} from "lucide-react";
import { animationOpacity, hover } from "@/styles/style";
import { useSwipeable } from "react-swipeable";
import { LotTypes } from "@/types/types";


export default function PhotoSection({lot}:{lot: LotTypes | null}) {

    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const [selectPhoto, setSelectPhoto] = useState(0)
    const arrow = 'bg-black/50 rounded-full text-white p-2 w-10 h-10'

    const handleNext = () => {
        setSelectPhoto((prev) => (prev + 1) % lot?.images.length)
    }

    const handleBack = () => {
        setSelectPhoto((prev) => (prev - 1 + lot.images.length) % lot.images.length)
    }

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handleBack
    })

    if(!lot) return

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 gap-2">
        <div {...handlers} className="flex justify-center items-center w-full lg:h-110 2xl:h-130 relative overflow-hidden rounded-t-md">
            <div className="w-full h-full blur-[10px] brightness-75 absolute z-0" style={{backgroundImage: `url(${BASE_URL}${lot.images[selectPhoto]})`, backgroundSize: 'cover',}}></div>
            <img  src={`${BASE_URL}${lot.images[selectPhoto]}`} className={`h-full ${animationOpacity}`}/>
            <div className='bg-black/50 p-2 absolute bottom-2 right-2 rounded-md flex gap-2 justify-center items-center'>
                <Image className="text-white"/>
                <span className="text-white ">{selectPhoto + 1} / {lot.images.length}</span>
            </div>
            <div className="flex justify-between items-center absolute top-1/2 left-0 w-full">
                <ChevronLeft className={`${hover} ${arrow}`} onClick={handleBack}/>
                <ChevronRight className={`${hover} ${arrow}`} onClick={handleNext}/>
            </div>
        </div>
        <div className="w-full flex justify-start overflow-x-auto md:flex-wrap md:overflow-x-visible gap-2 md:gap-5 items-center h-full">
            {lot.images.map((img, i) => (
                <img key={i} src={`${BASE_URL}${img}`} onClick={() => setSelectPhoto(i)} className={`${animationOpacity} ${i === selectPhoto && 'border-orange-600'} w-20 md:w-1/6 2xl:w-1/7 rounded-md cursor-pointer border-2 border-gray-300`}/>
            ))}
        </div>
     </div>
  )
}

