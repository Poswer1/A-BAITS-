'use client'

import { animationOpacity, hover} from "@/styles/style"
import { ChevronDown, Fish, Zap, Activity, Settings, Link2,  Layers, Snowflake, ArrowRightCircle, Feather, Gift, Monitor, Box} from "lucide-react";
import { hoverCat, hoverSub, linkClass, listClass } from "@/styles/categoryList";
import { categoriesWithIcons } from "@/category/category";
import { overlay } from "@/styles/global";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


interface CategoryList {
    setOpenCategory: (type:boolean) => void
    openFrom:string
}

function CategoryList({setOpenCategory, openFrom} : CategoryList) {
    if(!categoriesWithIcons) return

  const params = useParams()
  const lang = params.lang as string
  const router = useRouter()

  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [subSubCategory, setSubSubCategory] = useState('')

  const [openSubCategory, setOpenSubCategory] = useState<string | null>('primanki') 
  const [openSubSubCategory, setOpenSubSubCategory] = useState<string | null>(null) 

  const activeCategory = categoriesWithIcons.find(
    cat => cat.name === category
  )

  const handleSelectSub = (subName: string, hasSubSub: boolean) => {
  if (hasSubSub) {
    setOpenSubSubCategory(prev => (prev === subName ? null : subName));
  }
  
};

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
  let path = `/${lang}`

  if(category)path += `/${category}`
  if(subCategory)path += `/${subCategory}`
  if(subSubCategory)path += `/${subSubCategory}`
  setOpenCategory(false)

  router.push(`${path}`)
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

  return (
    <>
    <div className={`${overlay}`} onClick={() => setOpenCategory(false)}>
          <div className="flex justify-between items-center w-full">

          </div>
          <div onClick={(e) => e.stopPropagation()} className={`w-full md:w-2/3 bg-gray-100 rounded-md ${openFrom === 'header' && 'top-0 md:top-[8%] absolute' }  flex justify-start items-start z-30 text-black`}>
            <ul className='flex flex-col justify-start items-start gap-3 md:border-r p-2 w-full md:w-auto overflow-auto h-screen md:h-auto'>
                {categoriesWithIcons.map((cat) => ( 
                  <li key={cat.name} onClick={handleClick} onMouseEnter={() => handleSelectCat(cat.name)} className={`${hoverCat} ${category === cat.name ? 'bg-orange-800/10 text-orange-600' : '' } flex justify-between p-1 rounded-md items-center w-full ${animationOpacity}`} >
                    <span className={`${linkClass}`}>{cat.icon}{nameLang(cat)}</span>
                    <ChevronDown className="rotate-270"/>
                </li>
                ))}
            </ul>

            {activeCategory && (
              <ul className={`${listClass} p-2 gap-5 md:static fixed bg-white justify-start md:bg-transparent h-full w-full md:w-auto`}>
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
