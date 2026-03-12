import { useTranslation } from "@/app/context/TranslationProvider"
import { hoverSub } from "@/styles/categoryList"
import { overlay } from "@/styles/global"
import { animationOpacity, hoverLink } from "@/styles/style"
import { useMemo } from "react"


function SearchValue({setOpenSearch, search}: {setOpenSearch: (type: boolean) => void, search:string}) {

    const {t} = useTranslation()

    const allProducts = [
        {text:'name1', lot: '709055'},
        {text:'name2', lot: '7309055'},
        {text:'name3', lot: '739090553'},
        {text:'2018 AUDI Q7 PRESTIGE', lot: '73909055'},
    ]

    const filterProducts = useMemo(() => {
        return allProducts.filter(p =>
            p.text.toLowerCase().includes(search.toLowerCase()) ||
            p.lot.toLowerCase().includes(search.toLowerCase())
        )
    }, [allProducts, search])

  return (
    <>
    <div className={overlay} onClick={() => setOpenSearch(false)}></div>
        <div className={`${animationOpacity} bg-gray-100 w-full p-2 rounded-md absolute top-12 z-20 flex flex-col justify-center items-start gap-2`} onClick={(e) => e.stopPropagation()}>
            {filterProducts.map((p) => (
                <div className={`${animationOpacity} flex flex-col justify-center items-start cursor-pointer`}>
                  <span className={hoverSub}>{p.text}</span>
                  <p className="text-base text-gray-500">№ лота {p.lot}</p>
                </div>
            ))}
            <span className='text-gray-500'>
            {filterProducts.length === 0 && t('header','searchValueNotFound')}
            </span>
        </div>
    </>
  )
}

export default SearchValue
