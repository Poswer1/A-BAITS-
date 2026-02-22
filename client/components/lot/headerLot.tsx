import { useTranslation } from "@/app/context/TranslationProvider"
import { hover } from "@/styles/style"
import { Copy, ChevronRight, Star } from "lucide-react"
import { useParams } from "next/navigation"


interface HeaderLot {
    lot:any
}

export default function HeaderLot({lot}:HeaderLot) {

    const params = useParams()
    const lang = params.lang as string

    const {t} = useTranslation()

  return (
    <div className='w-full justify-center items-center sticky top-0 z-15 flex  border-b border-gray-300'>
        <div className='w-[80%] bg-white p-2 flex justify-between items-end'>
            <div className='flex flex-col justify-center items-start gap-2'>
                <h1 className="text-2xl font-bold">{lot.name || 'Not Found'}</h1>
                <div className="flex justify-start items-center gap-6 text-gray-800">
                    <span className="flex gap-1">
                        № лота 
                        <span className="text-orange-600">{lot.lotNumber || '11111111'}</span>
                        <Copy className="text-orange-600 w-4 cursor-pointer"/>
                    </span>
                    <span>{t('lot', 'lot-state')} <span className="text-orange-600">{lot.state}</span></span>
                    <span>{t('lot', 'lot-location')}<span className="text-black font-bold"> {lot.location}</span></span>
                    <span className="flex text-black">{lot.category} <ChevronRight className="w-5"/> {lot.subCategory} {lot.subSubCategory && lot.subSubCategory}</span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-end gap-2">
                <span className={`${hover} flex justify-center items-center gap-2 text-orange-600 bg-orange-600/10 px-2 py-1 rounded-md`}>
                    <Star /> {t('lot', 'lot-favorite')}
                </span>
                <span className="text-sm text-gray-500">{t('lot', 'lot-views')}: 32</span>
                <span className="text-sm  text-gray-500">{t('lot', 'lot-favoriteCount')}: 4</span>
            </div>
        </div>
    </div>
  )
}

