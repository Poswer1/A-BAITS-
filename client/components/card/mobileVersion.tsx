import { useState, useEffect } from "react"
import LotCard from "./lotCard"
import LotCardV2 from "./lotCardV2"
import { LotTypes } from "@/types/types"

interface MobileProps {
    lots:LotTypes[]
    select?:string
    selectLot?: React.Dispatch<React.SetStateAction<string>>
}

function MobileVersion({lots, select, selectLot}:MobileProps) {

const [mobile, setMobile] = useState<boolean | null>(null)

useEffect(() => {
    const checkMobile = () => {
      console.log("window", window.innerWidth)
      setMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  return (
    <>
    {mobile === null ? null : (
              mobile ? (
                
                  <div className="w-full grid grid-cols-2 gap-2">
                    {lots.map((l) => (
                      <LotCard key={l._id} lot={l} openFrom='catalog' select={select} selectLot={selectLot}/>
                    ))}
                  
                </div>
              ) : (
                lots.map((l) => (
                  <LotCardV2 key={l._id} lot={l} select={select} selectLot={selectLot}/>
                ))
              )
        )}
    </>
  )
}

export default MobileVersion
