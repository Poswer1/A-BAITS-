import React from 'react'

export default function SearchSection() {
  return (
<div className={`flex flex-col justify-center items-center ${openSearch ? 'block w-full' : 'w-0'} transition-all duration-500 md:block md:w-[60%] 2xl:w-[40%] relative`}>
                        <div className={`flex justify-start items-center p-2 gap-2 bg-gray-100 rounded-md border border-gray-200 w-full ${openSearch ? 'z-90 block' : 'hidden md:block md:flex'}`}>
                            <Search size={20} className='text-gray-500'/>
                            <input 
                            placeholder={t('header','searchPlaceholder')} 
                            className='text-base outline-none w-full' 
                            onChange={(e) => {setSearch(e.target.value), 
                            setOpenSearch(true)}} 
                            value={search} 
                            onKeyDown={(e) => {
          if(e.key === 'Enter') {
          handleSearch(search)
          }
          }}/>
         {openSearch && search.length > 0 &&(
          <X className={`${hover} text-black`} onClick={() => {setSearch(''), setOpenSearch(false)}}/>
         )}
        </div>
       {openSearch && search.length > 0 &&(
        <SearchValue setOpenSearch={setOpenSearch} search={search} setSearch={setSearch}/>
       )}
    </div>
  )
}

