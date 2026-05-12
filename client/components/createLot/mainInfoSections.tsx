import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, input, nameInput } from "@/styles/createLot"
import { arrowActive, hover } from "@/styles/style"
import { ChevronDown, Menu } from "lucide-react"
import InputField from "../ui/inputFields"

interface MainInfoProps {
    name:String
    setName:(value:string) => void
    openCategory:boolean
    setOpenCategory: React.Dispatch<React.SetStateAction<boolean>>
    createLotCategory:string
    createLotSubCategory:string
    createLotSubSubCategory:string
    nameError?: boolean
    categoryError?: boolean
}

export default function MainInfoSections({name, setName, openCategory, setOpenCategory, createLotCategory, createLotSubCategory, createLotSubSubCategory, nameError, categoryError} : MainInfoProps) {

    const {t} = useTranslation() 
  return (
    <div className={`${block} gap-4`}>
        <div className={Blockinput}>
            <InputField label={t('createLot','createLot-name')} 
            value={name.toString()} 
            onChange={setName} 
            placeholder={t('createLot','createLot-nameInput')} 
            type="text" 
            maxLength={70}
            error={nameError}/>
        </div>

         <div className={Blockinput}>
            <span className={nameInput}>{t('createLot','createLot-category')}</span>
            <div onClick={() => setOpenCategory(prev => !prev)} className={` ${hover} flex justify-between items-center w-full md:w-1/2 bg-gray-100 text-black p-2 rounded-lg border ${createLotCategory ? 'bg-orange-600/10 border-transparent' : categoryError ? 'border-red-500' : 'border-transparent'}`}>
                {createLotCategory ? (
                    <div className="flex flex-col justify-center items-start gap-1">
                        <span className="">{createLotCategory}</span>
                        {(createLotSubCategory || createLotSubSubCategory) && (
                          <span className="text-gray-500">{createLotSubCategory} {createLotSubSubCategory && `| ${createLotSubSubCategory}`}</span>
                        )}
                    </div>
                ): (
                    <span className="flex justify-center items-center gap-2"><Menu size={20}/>{t('createLot','createLot-selectCategory')}</span>
                )}
                <ChevronDown className={arrowActive(openCategory)}/> 
            </div>
            {categoryError && (
                <span className="text-red-500 text-xs">{t('createLot', 'createLot-required-field')}</span>
            )}
        </div>
      </div>
  )
}


