import { getAllLot } from "@/services/lot"
import { LotTypes } from "@/types/types"


function page() {

  const listLots: LotTypes[] = []

  try {
    listLots = await getAllLot()
  } catch (error) {
    
  }

  return (
    <div>
      
    </div>
  )
}

export default page
