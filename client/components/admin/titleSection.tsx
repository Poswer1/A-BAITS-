import { hover } from '@/styles/style'
import SearchBlock from '../ui/search'
import { ChevronLeft } from 'lucide-react'

interface TitleSectionProps {
    title:string
    searchValue?:string,
    setSearchValue?: (v:string) => void,
    placeholderSearch?:string
    edit?:boolean
    setEdit?: (v:boolean) => void
}

export default function TitleSection({title, searchValue, setSearchValue,placeholderSearch, edit, setEdit}:TitleSectionProps) {
  return (
    <div className='flex flex-col md:flex-row justify-start items-start md:items-center gap-5 w-full p-2 md:p-0'>
            {edit && (
                <span className={`${hover} flex justify-start items-center`} onClick={() => setEdit?.(false)}><ChevronLeft /> Назад</span>
            )}
            <h1 className='text-xl'>{title}</h1>
            {(searchValue || setSearchValue || placeholderSearch) && (
             <div className={`${edit && 'hidden'} flex w-full md:w-1/4`}>
                <SearchBlock 
                    searchValue={searchValue || ''} 
                    setSearchValue={setSearchValue!} 
                    placeholder={placeholderSearch || ''} 
                />
            </div>
            )}
        </div>
  )
}


