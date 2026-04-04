import { Search } from 'lucide-react'

interface SearchProps {
    searchValue:string
    setSearchValue: (v: string) => void
    placeholder: string
}

export default function SearchBlock({searchValue, setSearchValue, placeholder}: SearchProps) {
  return (
    <div className='flex items-center p-2 border border-gray-300 gap-2 rounded-xl w-full'>
        <Search className='text-gray-500' size={20}/>
        <input className='outline-none w-full' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}

