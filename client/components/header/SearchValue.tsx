import { useTranslation } from "@/app/context/TranslationProvider"
import { getAllLot } from "@/services/lot"
import { BASE_URL } from "@/services/utils"
import { hoverSub } from "@/styles/categoryList"
import { overlay } from "@/styles/global"
import { animationOpacity, hoverLink } from "@/styles/style"
import { LotTypes } from "@/types/types"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"


function SearchValue({setOpenSearch, search, setSearch}: {setOpenSearch: (type: boolean) => void, search:string, setSearch: (v:string) => void}) {

    const {t} = useTranslation()
    const params = useParams()

    const [allLots, setAllLots] = useState<LotTypes[]>([])

    useEffect(() => {
        getAllLot()
        .then(data => {
            setAllLots(data)
        })
    }, [])

    const filterProducts = useMemo(() => {
        return allLots.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.lotNumber.toLowerCase().includes(search.toLowerCase())
        )
    }, [allLots, search])


  return (
    <>
        <div className={`${animationOpacity} bg-gray-100 w-full max-h-100 overflow-y-auto p-2 rounded-md absolute top-12 z-80 flex flex-col justify-start items-start gap-2 custom-scrollbar`} onClick={(e) => e.stopPropagation()}>
            {filterProducts.map((p) => (
                <Link href={`/${params.lang}/${p.name}`} onClick={() => {setOpenSearch(false), setSearch('')}} className={`${animationOpacity} flex flex-col justify-center items-start cursor-pointer`}>
                  <span className={`${hoverSub} text-black`}>{p.name}</span>
                  <p className="text-sm text-gray-500">№ лота {p.lotNumber}</p>
                </Link>
            ))}
            <span className='text-gray-500'>
            {filterProducts.length === 0 && t('header','searchValueNotFound')}
            </span>
        </div>
    </>
  )
}

export default SearchValue
