import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput, selectBlock } from "@/styles/createLot"
import { arrowActive, hover } from "@/styles/style"
import { AlertTriangle, ChevronDown } from "lucide-react"

interface MainInfoProps {
    name:String
    setName:(value:string) => void
    openCategory:boolean
    setOpenCategory: (value:boolean) => void
    category:string
    subCategory:string
    subSubCategory:string
}

export default function MainInfoSections({name, setName, openCategory, setOpenCategory, category, subCategory, subSubCategory} : MainInfoProps) {

    const {t} = useTranslation() 

  return (
    <div className={block}>
          <div className={Blockinput}>
            <span className={nameInput}>{t('createLot','createLot-name')}</span>
            <div className={`flex justify-start items-center w-full ${`${name.length > 70 ? 'border-orange-600 bg-orange-600/10' : 'border-gray-500'} rounded-md`} border`}>
                <input placeholder={t('createLot','createLot-nameInput')} value={name} onChange={(e) => setName(e.target.value)} className={`${input}  p-2`}/>
                <AlertTriangle className={`${name.length > 70 ? 'flex' : 'hidden'} text-orange-600 mr-2`}/>
            </div>
            <div className={`flex justify-between items-center w-full`}>
               <span className={`${nameInput} ${name.length > 70 && 'text-orange-600'}`}>{t('createLot',"createLot-lengthName")}</span>
               <span className={`${nameInput} ${name.length > 70 && 'text-orange-600'}`}>{name.length}/70</span>
            </div>
        </div>
         <div className={Blockinput}>
            <span className={nameInput}>{t('createLot','createLot-category')}</span>
            <div onClick={() => setOpenCategory(prev => !prev)} className={` ${hover} ${selectBlock} ${(category && subCategory) && 'bg-orange-600/10'}`}>
                {(category && subCategory) ? (
                    <div className="flex flex-col justify-center items-start gap-1">
                        <span className="font-bold">{category}</span>
                        <span className="text-gray-500">{subCategory}{subSubCategory && `/${subSubCategory}`}</span>
                    </div>
                ): (
                    <span>{t('createLot','createLot-selectCategory')}</span>
                )}
                <ChevronDown className={arrowActive(openCategory)}/> 
            </div>
        </div>
      </div>
  )
}


