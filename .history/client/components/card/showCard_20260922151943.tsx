'use client'

import { animate } from "@/styles/global"
import { LotTypes } from "@/types/types"
import { LayoutGrid, Rows3 } from "lucide-react"
import { useEffect, useState } from "react"
import LotCard from "./lotCard"
import LotCardV2 from "./lotCardV2"

interface ShowCardProps {
    lots:LotTypes[]
    select?:string
    selectLot?: React.Dispatch<React.SetStateAction<string>>
}

function ShowCard({lots, select, selectLot}:ShowCardProps) {

 const [stateCard, setStateCard] = useState('Tile')
 const [mobile, setMobile] = useState<boolean | null>(null)

 useEffect(() => {
     const checkMobile = () => {
       setMobile(window.innerWidth < 768)
     }
 
     checkMobile()
 
     window.addEventListener("resize", checkMobile)
 
     return () => {
       window.removeEventListener("resize", checkMobile)
     }
   }, [])

  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
       <div className='flex justify-start items-center text-black gap-2'>
            <span onClick={() => setStateCard('Tile')} className={`${animate} ${stateCard === 'Tile' && 'bg-orange-600/10 text-orange-600'} flex justify-center items-center p-2 bg-gray-100 rounded-md`}>
              <LayoutGrid size={18}/>
            </span>
            <span onClick={() => setStateCard('Grid')} className={`${animate} ${stateCard === 'Grid' && 'bg-orange-600/10 text-orange-600'} flex justify-center items-center p-2 bg-gray-100 rounded-md`}>
              <Rows3 size={18}/>
            </span>
        </div>
        {mobile === null ? null : mobile ? (
            <div className="w-full grid grid-cols-2 gap-2">
                {lots.map((l) => (
                stateCard === 'Tile' ? (
                    <LotCard
                    key={l._id}
                    lot={l}
                    openFrom="catalog"
                    select={select}
                    selectLot={selectLot}
                    />
                ) : (
                    <LotCardV2
                    key={l._id}
                    lot={l}
                    select={select}
                    selectLot={selectLot}
                    />
                )
                ))}
            </div>
            ) : (
            lots.map((l) => (
                <LotCardV2
                key={l._id}
                lot={l}
                select={select}
                selectLot={selectLot}
                />
            ))
            )}
    </div>
  )
}

export default ShowCard
