import { useTranslation } from "@/app/context/TranslationProvider"
import { Copy, ChevronRight} from "lucide-react"
import ListLocation from '../../data/citiesUK.json'
import { useParams } from "next/navigation"
import FavoritesButton from "../ui/favoritesButton"



interface HeaderLot {
    lot:any
}

export default function HeaderLot({lot}:HeaderLot) {
    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    

  return (
    <div className='w-full justify-center items-center sticky top-0 z-15 md:flex border-b border-gray-300 text-black hidden md:block'>
        <div className='w-full 2xl:w-[80%] lg:w-[90%] bg-white p-2 flex justify-between items-end'>
            <div className='flex flex-col justify-center items-start gap-2 hidden md:block'>
                <h1 className="text-2xl font-bold">{lot.name || 'Not Found'}</h1>
                <div className="flex justify-start items-center gap-6 text-gray-800">
                    <span className="flex gap-1">
                        № лота 
                        <span className="text-orange-600">{lot.lotNumber || '11111111'}</span>
                        <Copy className="text-orange-600 w-4 cursor-pointer"/>
                    </span>
                    <span>{t('lot', 'lot-state')} <span className="text-orange-600">{transleteState || lot.state}</span></span>
                    <span>{t('lot', 'lot-location')}<span className="text-orange-600"> {transleteCity || lot.location}</span></span>
                    <span className="flex text-black">{TransleteCategory && lang === 'ru' ? TransleteCategory.ru : TransleteCategory?.uk} | {TransleteSubCategory && lang === 'ru' ? TransleteSubCategory.ru : TransleteSubCategory?.uk} | {TransleteSubSubCategory && lang === 'ru' ? TransleteSubSubCategory?.ru : TransleteSubSubCategory?.uk}</span>
                </div>
            </div>
            <div className="flex md:flex-col justify-center items-center md:items-end gap-2">
                <FavoritesButton id={lot._id}/>
                <span className="text-sm text-gray-500 hidden md:block">{t('lot', 'lot-views')}: 32</span>
                <span className="text-sm  text-gray-500 hidden md:block">{t('lot', 'lot-favoriteCount')}: 4</span>
            </div>
        </div>
    </div>
  )
}

