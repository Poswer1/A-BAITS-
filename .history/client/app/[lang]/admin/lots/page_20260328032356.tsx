import { getAllLot } from "@/services/lot"
import { LotTypes } from "@/types/types"


export default async function page() {

  let listLots: LotTypes[] = []

  try {
    listLots = await getAllLot()
  } catch (error) {
    listLots = []
  }

  return (
    <div>
      
    </div>
  )
}
