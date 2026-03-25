'use client'

import { animationOpacity, hover} from "@/styles/style"
import { ChevronDown, Fish, Zap, Activity, Settings, Link2,  Layers, Snowflake, ArrowRightCircle, Feather, Gift, Monitor, Box, X, ChevronLeft} from "lucide-react";
import { hoverCat, hoverSub, linkClass, listClass } from "@/styles/categoryList";
import { categoriesWithIcons } from "@/category/category";
import { overlay } from "@/styles/global";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getValueByLang } from "@/utils/translateValue";
import { useTranslation } from "@/app/context/TranslationProvider";


interface CategoryList {
    setOpenCategory: (type:boolean) => void
    openFrom:string
    createLotSetCategory:(v:string) => void,
    createLotSetSubCategory:(v:string) => void,
    createLotSetSubSubCategory:(v:string) => void,
}

function CategoryList({setOpenCategory, openFrom, createLotSetCategory, createLotSetSubCategory, createLotSetSubSubCategory} : CategoryList) {
  if(!categoriesWithIcons) return

  const params = useParams()
  const lang = params.lang as string
  const router = useRouter()

  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [subSubCategory, setSubSubCategory] = useState('')

  const {t} = useTranslation()

  const activeCategory = categoriesWithIcons.find(cat => cat.name === category)

  const handleSelectCat = (cat?:string, sub?:string, subSub?:string) => {
    if(cat) {
      setCategory(cat)
    } 
    if(sub) {
      setSubCategory(sub)
    }
    if(subSub) {
      setSubSubCategory(subSub)
    }
  }

  const handleClick = () => {

    if(openFrom === 'header') {
      let path = `/${lang}`
      if(category)path += `/${category}`
      if(subCategory)path += `/${subCategory}`
      if(subSubCategory)path += `/${subSubCategory}`
      router.push(`${path}`)
    } else if(openFrom === 'createLot') {
      if(category)createLotSetCategory(category)
      if(subCategory)createLotSetSubCategory(subCategory)
      if(subSubCategory)createLotSetSubSubCategory(subSubCategory)
    }
    setOpenCategory(false)
  }

  useEffect(() => {
    
    if(openFrom) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }

  }, [openFrom])

  const nameLang = (item: { ru?: string; uk?: string; name: string }) =>
    lang === 'ru' ? item.ru || item.name : item.uk || item.name

  const transleteCategory = getValueByLang(categoriesWithIcons, category, lang)

  return (
    <>
    <div className={`${overlay}`} onClick={() => setOpenCategory(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${animationOpacity} w-full md:w-2/3  ${openFrom === 'header' ? 'top-15' : 'top-1/2'} bg-white rounded-md flex flex-col md:flex-row justify-start items-start z-30 text-black h-full md:h-auto`}>
            
          <div className="flex justify-between items-center w-full text-black border-b border-gray-300 p-2 md:hidden bg-white">
                {category && (
                  <ChevronLeft onClick={() => setCategory('')}/>
                )}
                <h1 className="text-black text-xl font-bold">{transleteCategory || t('header', 'category')}</h1>
                <X onClick={() =>setOpenCategory(false)}/>
            </div>
              
            <ul className={`${activeCategory && 'hidden md:flex'} flex flex-col justify-start items-start gap-3 md:border-r p-2 w-full md:w-auto overflow-auto h-screen md:h-auto`}>
                {categoriesWithIcons.map((cat) => ( 
                  <li key={cat.name} onClick={handleClick} onMouseEnter={() => handleSelectCat(cat.name)} className={`${hoverCat} ${category === cat.name ? 'bg-orange-800/10 text-orange-600' : '' } flex justify-between p-1 rounded-md items-center w-full ${animationOpacity}`} >
                    <span className={`${linkClass}`}>{cat.icon}{nameLang(cat)}</span>
                    {cat?.subcategories.length > 0 && (
                      <ChevronDown className="rotate-270"/>
                    )}
                </li>
                ))}
            </ul>

            {activeCategory && (
              <ul className={`${listClass} p-2 gap-5 md:static bg-white justify-start md:bg-transparent h-screen md:h-full w-full md:w-auto`}>
                <h1 className="ml-2 text-black font-bold border-b border-gray-500 cursor-pointer md:hidden" onClick={handleClick}>{transleteCategory}</h1>
                {activeCategory.subcategories.map((sub) => (
                  <li key={sub.name} className={`${listClass} ${animationOpacity} ml-2 w-full`} >
                    <span className={`${linkClass} ${hover} text-black`} onClick={handleClick} onMouseEnter={() => handleSelectCat('', sub.name)}>
                      {nameLang(sub)}{sub.subcategories.length > 0 
                      && <ChevronDown className='text-gray-500'/>}
                    </span>

                    {subCategory === sub.name && (
                      <ul className={`${listClass} border-l border-gray-400`}>
                          {sub.subcategories.map((subSub) => (
                            <li className={`${listClass}  ${animationOpacity} ml-6`}key={subSub.name}>
                              <span className={`${linkClass} ${hoverSub} text-gray-500`} onClick={handleClick} onMouseEnter={() => handleSelectCat('', '', subSub.name)}>{nameLang(subSub)}</span>
                            </li>
                        ))}
                      </ul>
                      )}

                    </li>
                  ))}
                </ul>
              )}

        </div>
    </div>
    </>
  )
}

export default CategoryList
