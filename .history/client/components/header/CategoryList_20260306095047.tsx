'use client'

import { animationOpacity, hover} from "@/styles/style"
import { ChevronDown, Fish, Zap, Activity, Settings, Link2,  Layers, Snowflake, ArrowRightCircle, Feather, Gift, Monitor, Box} from "lucide-react";
import { hoverCat, hoverSub, linkClass, listClass } from "@/styles/categoryList";
import { categoriesWithIcons } from "@/category/category";
import { overlay } from "@/styles/global";
import { useState } from "react";

interface CategoryList {
    setOpenCategory: (type:boolean) => void
    openFrom:string
    category?:string | null
    setCategory?:(v: string ) => void
    subCategory?:string | null
    setSubCategory?:(v: string ) => void
    subSubCategory?:string | null
    setSubSubCategory?:(v: string) => void
}

function CategoryList({setOpenCategory, openFrom, category, setCategory, subCategory, setSubCategory, subSubCategory, setSubSubCategory} : CategoryList) {
    if(!categoriesWithIcons) return

  const [openSubCategory, setOpenSubCategory] = useState<string | null>('Приманки') 
  const [openSubSubCategory, setOpenSubSubCategory] = useState<string | null>(null) 

  const activeCategory = categoriesWithIcons.find(
    cat => cat.name === openSubCategory
  )

  const handleSelectSub = (subName: string, hasSubSub: boolean) => {
  if (hasSubSub) {
    setOpenSubSubCategory(prev => (prev === subName ? null : subName));
  }
  if(openFrom !== 'header') {
    setSubCategory(prev => (prev === subName ? null : subName))
  }
};

const handleSelectCat = (catName:string) => {
  if(catName) {
    setOpenSubCategory(prev => prev === catName ? null : catName)
    setSubCategory(null)
    setSubSubCategory(null)
  } 
  if(openFrom !== 'header' && setCategory) {
    setCategory(prev => prev === catName ? null : catName)
  }
}

  return (
    <>
    <div className={`${overlay}`} onClick={() => setOpenCategory(false)}>
          <div onClick={(e) => e.stopPropagation()} className={`w-2/3 bg-gray-100 rounded-md ${openFrom === 'header' && 'top-[8%] absolute' }  flex justify-start items-start z-30`}>
        
            <ul className='flex flex-col justify-start items-start gap-3 border-r p-2'>
                {categoriesWithIcons.map((cat) => ( 
                  <li key={cat.name} onClick={() => setOpenCategory(false)} onMouseEnter={() => handleSelectCat(cat.name)} className={`${hoverCat} ${openSubCategory === cat.name ? 'bg-orange-800/10 text-orange-600' : '' } flex justify-between p-1 rounded-md items-center w-full ${animationOpacity}`} >
                    <span className={`${linkClass}`}>{cat.icon}{cat.name}</span>
                    <ChevronDown className="rotate-270"/>
                </li>
                ))}
            </ul>

            {activeCategory && (
              <ul className={`${listClass} p-2 gap-5`}>
                {activeCategory.subcategories.map((sub) => (
                  <li key={sub.name} className={`${listClass}  ${animationOpacity} ml-2 `} >
                    <span className={`${linkClass} ${hover} text-black`} onClick={() => setOpenCategory(false)} onMouseEnter={() => handleSelectSub(sub.name, sub.subcategories.length > 0)}>
                      {sub.name}{sub.subcategories.length > 0 
                      && <ChevronDown className='text-gray-500'/>}
                    </span>

                    {openSubSubCategory === sub.name && (
                      <ul className={`${listClass} border-l border-gray-400`}>
                          {sub.subcategories.map((subSub) => (
                            <li className={`${listClass}  ${animationOpacity} ml-6`}key={subSub.name}>
                              <span className={`${linkClass} ${hoverSub} text-gray-500`} onClick={() => setOpenCategory(false)} onMouseEnter={() => setSubSubCategory(prev => prev === subSub.name ? null : subSub.name)}>{subSub.name}</span>
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
