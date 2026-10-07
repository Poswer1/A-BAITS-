import { useTranslation } from "@/app/context/TranslationProvider"
import { Eye, Star } from "lucide-react"
import { useParams } from "next/navigation"
import FavoritesButton from "@/components/ui/favoritesButton"
import { getValueByLang } from "@/utils/translateValue"
import { categoriesWithIcons } from "@/category/category"
import ListLocation from '../../data/citiesUK.json'
import { LotTypes } from "@/types/types"
import Link from "next/link"


interface HeaderLot {
     lot: LotTypes | null,
}

export default function HeaderLot({lot}:HeaderLot) {
    const {t} = useTranslation()
    const params = useParams()
    const lang = params.lang as string

    const stateList = [
        {name: 'new', lang: t('catalog', 'state-new')},
        {name: 'used', lang: 'Б/У'},
        {name: 'needsRepairs', lang: t('catalog', 'state-needsRepairs')},
        {name: 'forSpare', lang: t('catalog', 'state-forSpare')}
    ]

    const transleteState = getValueByLang(stateList, lot?.state || '', lang) 
    const transleteCity = getValueByLang(ListLocation, lot?.location || '', lang)

    const TransleteCategory = categoriesWithIcons.find(c => c.name === lot?.category )
    const TransleteSubCategory = TransleteCategory?.subcategories.find(s => s.name === lot?.subCategory)
    const TransleteSubSubCategory = TransleteSubCategory?.subcategories.find(s => s.name === lot?.subSubCategory)

  return (
    <div className='flex p-2 md:p-0 w-full justify-center items-center border-b border-gray-300 text-black'>
        <div className='w-full flex-col md:flex-row 2xl:w-[80%] lg:w-[90%] bg-white p-2 flex justify-between items-start gap-2 md:items-end'>
            <div className='flex flex-col justify-center items-start gap-2'>
                <h1 className="text-2xl font-bold">{lot?.name || 'Not Found'}</h1>
                <div className="flex flex-wrap text-sm md:text-base justify-start items-center gap-2 md:gap-6 text-gray-800">
                    <span>{t('lot', 'lot-state')} <span className="text-orange-600">{transleteState || lot?.state}</span></span>
                    <span>{t('lot', 'lot-location')}<span className="text-orange-600"> {transleteCity || lot?.location}</span></span>
                    <nav aria-label={lang === 'ru' ? 'Категория товара' : 'Категорія товару'} className="flex flex-wrap text-black gap-1">
                        {TransleteCategory && (
                            <Link href={`/${lang}/${TransleteCategory.name}`} className="hover:text-orange-600">
                                {lang === 'ru' ? TransleteCategory.ru : TransleteCategory.uk}
                            </Link>
                        )}
                        {TransleteSubCategory && (
                            <>
                                <span aria-hidden="true">|</span>
                                <Link href={`/${lang}/${TransleteCategory?.name}/${TransleteSubCategory.name}`} className="hover:text-orange-600">
                                    {lang === 'ru' ? TransleteSubCategory.ru : TransleteSubCategory.uk}
                                </Link>
                            </>
                        )}
                        {TransleteSubSubCategory && (
                            <>
                                <span aria-hidden="true">|</span>
                                <Link href={`/${lang}/${TransleteCategory?.name}/${TransleteSubCategory?.name}/${TransleteSubSubCategory.name}`} className="hover:text-orange-600">
                                    {lang === 'ru' ? TransleteSubSubCategory.ru : TransleteSubSubCategory.uk}
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end gap-2">
                <FavoritesButton id={lot?._id || ''}/>
                <div className="flex md:flex-col w-full gap-5 md:gap-2 md:items-end">
                    <span className="text-sm flex gap-1 text-gray-500"><Eye size={20}/>{t('lot', 'lot-views')}: {lot?.views.length}</span>
                    <span className="text-sm flex gap-1 text-gray-500"><Star size={20}/>{t('lot', 'lot-favoriteCount')}: {lot?.favoritesCount}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
